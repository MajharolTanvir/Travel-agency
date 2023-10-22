/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BookedHotel, BookedPackage } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createBookedPackage = async (bookingData: BookedPackage) => {
  const bookedPackage = await prisma.bookedPackage.create({
    data: bookingData,
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

  return bookedPackage;
};

const getBookedPackage = async () => {
  const bookedPackage = await prisma.bookedPackage.findMany({
    include: {
      user: true,
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
    },
  });
  return bookedPackage;
};

const updateBookedPackage = async (
  id: string,
  bookingData: Partial<BookedHotel>
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
  const bookedPackage = await prisma.bookedHotel.delete({
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
