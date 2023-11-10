/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BookedPackage } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51OAR7HA5j9z44Pg1nReLXxLECwBCr3xCYuUULC6ygHec2tOGYkvAnGN7ptzlmeMjtRh2ShKFOqwJxzGY6cKtiVgb007qEHSTkN'
);

const createBookedPackage = async (bookingData: BookedPackage) => {
  const bookedPackage = await prisma.bookedPackage.create({
    data: bookingData,
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: bookedPackage.totalCost,
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const traveler = await prisma.packagePlan.findFirst({
    where: {
      id: bookedPackage.packageId,
    },
  });

  if (
    //@ts-ignore
    traveler?.travelerSize <
    //@ts-ignore
    traveler?.bookedTraveler + bookingData.travelingMember
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Trip member is full, Wait for next trip'
    );
  }

  await prisma.packagePlan.update({
    where: {
      id: traveler?.id,
    },
    data: {
      //@ts-ignore
      bookedTraveler: traveler?.bookedTraveler + bookedPackage.travelingMember,
    },
  });

  return { clientSecret: paymentIntent.client_secret, id: bookedPackage.id };
};

const getBookedPackage = async () => {
  const bookedPackage = await prisma.bookedPackage.findMany({
    include: {
      user: true,
      packagePlan: true,
    },
  });
  return bookedPackage;
};

const singleBookedPackage = async (id: string) => {
  const bookedPackage = await prisma.bookedPackage.findFirst({
    where: {
      id,
    },
    include: {
      user: true,
      packagePlan: true,
    },
  });
  return bookedPackage;
};

const updateBookedPackage = async (
  id: string,
  bookingData: Partial<BookedPackage>
) => {
  const bookedPackage = await prisma.bookedPackage.update({
    where: {
      id,
    },
    data: bookingData,
  });
  return bookedPackage;
};

const deleteBookedPackage = async (id: string) => {
  const packageData = await prisma.bookedPackage.findFirst({
    where: {
      id,
    },
    include: {
      packagePlan: true,
    },
  });

  const travelerSize = packageData && packageData.packagePlan.bookedTraveler - packageData.travelingMember;

  await prisma.packagePlan.update({
    where: {
      id: packageData?.packageId,
    },
    data: {
      bookedTraveler: travelerSize as number,
    },
  });

  const bookedPackage = await prisma.bookedPackage.delete({
    where: {
      id,
    },
  });
  return bookedPackage;
};

export const BookedPackageServices = {
  createBookedPackage,
  getBookedPackage,
  singleBookedPackage,
  updateBookedPackage,
  deleteBookedPackage,
};
