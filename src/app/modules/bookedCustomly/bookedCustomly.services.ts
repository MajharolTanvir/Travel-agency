import { BookedCustomly, TransportBooked } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createBookedCustomly = async (bookingData: BookedCustomly) => {
  const customBooking = await prisma.bookedCustomly.create({
    data: bookingData,
  });
  return customBooking;
};

const getBookedCustomly = async () => {
  const customBooking = await prisma.bookedCustomly.findMany({
    include: {
      room: true,
    },
  });
  return customBooking;
};

const singleBookedCustomly = async (id: string) => {
  const customBooking = await prisma.bookedCustomly.findFirst({
    where: {
      id,
    },
    include: {
      room: true,
    },
  });
  return customBooking;
};

const updateBookedCustomly = async (
  id: string,
  bookingData: Partial<BookedCustomly>
) => {
  const customBooking = await prisma.bookedCustomly.update({
    where: {
      id,
    },
    data: bookingData,
    include: {
      room: true,
    },
  });
  return customBooking;
};

const deleteBookedCustomly = async (id: string) => {
  const customBooking = await prisma.bookedCustomly.delete({
    where: {
      id,
    },
  });
  return customBooking;
};

const createTransportBooked = async (bookingData: TransportBooked) => {
  const transportBooking = await prisma.transportBooked.create({
    data: bookingData,
  });
  return transportBooking;
};

const updateTransportBooked = async (
  id: string,
  bookingData: Partial<TransportBooked>
) => {
  const transportBooking = await prisma.transportBooked.update({
    where: {
      bookedId: id,
    },
    data: bookingData,
  });
  return transportBooking;
};

const deleteTransportBooked = async (id: string) => {
  const customBooking = await prisma.transportBooked.delete({
    where: {
      bookedId: id,
    },
  });
  return customBooking;
};


export const customBookingServices = {
  createBookedCustomly,
  getBookedCustomly,
  singleBookedCustomly,
  updateBookedCustomly,
  deleteBookedCustomly,
  createTransportBooked,
  updateTransportBooked,
  deleteTransportBooked,
};
