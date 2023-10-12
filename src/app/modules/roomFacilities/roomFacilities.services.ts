import { Prisma, RoomFacilities } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IRoomFacilitiesFilterType } from './roomFacilities.interface';
import { roomFacilitiesSearchAbleField } from './roomFacilities.constant';

const createRoomFacilities = async (data: RoomFacilities) => {
  const roomFacilities = await prisma.roomFacilities.create({
    data,
  });

  return roomFacilities;
};

const getAllRoomFacilities = async (
  filters: IRoomFacilitiesFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: roomFacilitiesSearchAbleField.map(field => ({
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

  const whereCondition: Prisma.RoomFacilitiesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const roomFacilities = await prisma.roomFacilities.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.roomFacilities.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: roomFacilities,
  };
};

const getSingleRoomFacilities = async (id: string) => {
  const roomFacilities = await prisma.roomFacilities.findFirst({
    where: {
      id,
    },
  });

  return roomFacilities;
};

const updateRoomFacilities = async (
  id: string,
  data: Partial<RoomFacilities>
) => {
  const roomFacilities = await prisma.roomFacilities.update({
    where: {
      id,
    },
    data,
  });

  return roomFacilities;
};

const deleteRoomFacilities = async (id: string) => {
  const roomFacilities = await prisma.roomFacilities.delete({
    where: {
      id,
    },
  });

  return roomFacilities;
};

export const RoomFacilitiesServices = {
  createRoomFacilities,
  getAllRoomFacilities,
  getSingleRoomFacilities,
  updateRoomFacilities,
  deleteRoomFacilities,
};
