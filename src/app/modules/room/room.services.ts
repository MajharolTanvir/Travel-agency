import { Division, Prisma, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IRoomFilterType } from './room.interface';
import { roomSearchAbleField } from './room.constant';

const createRoom = async (data: Room) => {
  const room = await prisma.room.create({
    data,
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
