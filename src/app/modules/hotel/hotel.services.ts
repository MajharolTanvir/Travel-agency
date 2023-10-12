import {  Hotel, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IHotelFilterType } from './hotel.interface';
import { hotelSearchAbleField } from './hotel.constant';

const createHotel = async (data: Hotel) => {
  const hotel = await prisma.hotel.create({
    data,
    include: {
      district: true,
      Room: true
    }
  });

  return hotel;
};

const getAllHotel = async (
  filters: IHotelFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: hotelSearchAbleField.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.HotelWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const hotel = await prisma.hotel.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      district: true,
      Room: true
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.hotel.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: hotel,
  };
};

const getSingleHotel = async (id: string) => {
  const hotel = await prisma.hotel.findFirst({
    where: {
      id,
    },
    include: {
      district: true,
      Room: true,
    }
  });

  return hotel;
};

const updateHotel = async (id: string, data: Partial<Hotel>) => {
  const hotel = await prisma.hotel.update({
    where: {
      id,
    },
    data,
    include: {
      district: true,
      Room: true,
    },
  });

  return hotel;
};

const deleteHotel = async (id: string) => {
  const hotel = await prisma.hotel.delete({
    where: {
      id,
    },
  });

  return hotel;
};

export const HotelsServices = {
  createHotel,
  getAllHotel,
  getSingleHotel,
  updateHotel,
  deleteHotel,
};
