import { BookedHotel } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createBookedHotel = async (bookingData: BookedHotel) => {
  const bookedHotel = await prisma.bookedHotel.create({
    data: bookingData,
  });
  return bookedHotel;
};

const getBookedHotel = async () => {
  const bookedHotel = await prisma.bookedHotel.findMany({
    include: {
      room: true,
    },
  });
  return bookedHotel;
};

const singleBookedHotel = async (id: string) => {
  const bookedHotel = await prisma.bookedHotel.findFirst({
    where: {
      id,
    },
    include: {
      room: true,
    },
  });
  return bookedHotel;
};

const updateBookedHotel = async (
  id: string,
  bookingData: Partial<BookedHotel>
) => {
  const bookedHotel = await prisma.bookedHotel.update({
    where: {
      id,
    },
    data: bookingData,
    include: {
      room: true,
    },
  });
  return bookedHotel;
};

const deleteBookedHotel = async (id: string) => {
  const bookedHotel = await prisma.bookedHotel.delete({
    where: {
      id,
    },
  });
  return bookedHotel;
};

export const BookedHotelServices = {
  createBookedHotel,
  getBookedHotel,
  singleBookedHotel,
  updateBookedHotel,
  deleteBookedHotel,
};
