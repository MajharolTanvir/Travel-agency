/* eslint-disable @typescript-eslint/no-explicit-any */
import { Division, Prisma, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IRoomFilterType } from './room.interface';
import { roomSearchAbleField } from './room.constant';

type JsonValue = any;

const createRoom = async (data: Room) => {
  const room = await prisma.room.create({
    data: {
      id: data.id,
      roomType: data.roomType,
      description: data.description,
      roomImages: (data.roomImages || []) as JsonValue[],
      roomPrice: data.roomPrice,
      checkInTime: data.checkInTime,
      checkOutTime: data.checkOutTime,
      hotelId: data.hotelId,
    },
    include: {
      hotel: true,
      RoomFacilities: true,
    },
  });

  return room;
};

const getAllRoom = async (
  filters: IRoomFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: roomSearchAbleField.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => {
        if (field === 'minPrice') {
          return {
            roomPrice: {
              gte: parseFloat(value as string),
            },
          };
        }
        if (field === 'maxPrice') {
          return {
            roomPrice: {
              lte: parseFloat(value as string),
            },
          };
        }
        return {
          [field]: value,
        };
      }),
    });
  }

  const whereCondition: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const room = await prisma.room.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      hotel: true,
      RoomFacilities: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.room.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: room,
  };
};

const getSingleRoom = async (id: string) => {
  const room = await prisma.room.findFirst({
    where: {
      id,
    },
    include: {
      hotel: true,
      RoomFacilities: true,
    },
  });

  return room;
};

const updateRoom = async (id: string, data: Partial<Division>) => {
  const room = await prisma.room.update({
    where: {
      id,
    },
    data,
    include: {
      hotel: true,
      RoomFacilities: true,
    },
  });

  return room;
};

const deleteRoom = async (id: string) => {
  const room = await prisma.room.delete({
    where: {
      id,
    },
  });

  return room;
};

export const RoomsServices = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
