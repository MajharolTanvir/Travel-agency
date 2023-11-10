import { Place, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { placeSearchAbleField } from './place.constant';
import { IPlaceFilterType } from './place.interface';

const createPlace = async (data: Place) => {
  const place = await prisma.place.create({
    data,
    include: {
      district: true,
    },
  });

  return place;
};

const getAllPlace = async (
  filters: IPlaceFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: placeSearchAbleField.map(field => ({
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

  const whereCondition: Prisma.PlaceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const place = await prisma.place.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      district: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.place.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: place,
  };
};

const getSinglePlace = async (id: string) => {
  const place = await prisma.place.findFirst({
    where: {
      id,
    },
    include: {
      district: true,
    },
  });

  return place;
};

const updatePlace = async (id: string, data: Partial<Place>) => {
  const place = await prisma.place.update({
    where: {
      id,
    },
    include: {
      district: true,
    },
    data,
  });

  return place;
};

const deletePlace = async (id: string) => {
  const place = await prisma.place.delete({
    where: {
      id,
    },
  });

  return place;
};

export const PlacesServices = {
  createPlace,
  getAllPlace,
  getSinglePlace,
  updatePlace,
  deletePlace,
};
