import { FacilitiesOptions, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { facilitiesSearchAbleField } from './facilitiesOptions.constant';
import { IFacilitiesFilterType } from './facilitiesOptions.interface';

const createFacilities = async (data: FacilitiesOptions) => {
  const facilities = await prisma.facilitiesOptions.create({
    data,
  });

  return facilities;
};

const getAllFacilities = async (
  filters: IFacilitiesFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: facilitiesSearchAbleField.map(field => ({
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

  const whereCondition: Prisma.FacilitiesOptionsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const facilities = await prisma.facilitiesOptions.findMany({
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

  const total = await prisma.facilitiesOptions.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: facilities,
  };
};

const getSingleFacilities = async (id: string) => {
  const facilities = await prisma.facilitiesOptions.findFirst({
    where: {
      id,
    },
  });

  return facilities;
};

const updateFacilities = async (
  id: string,
  data: Partial<FacilitiesOptions>
) => {
  const facilities = await prisma.facilitiesOptions.update({
    where: {
      id,
    },
    data,
  });

  return facilities;
};

const deleteFacilities = async (id: string) => {
  const facilities = await prisma.facilitiesOptions.delete({
    where: {
      id,
    },
  });

  return facilities;
};

export const FacilitiesServices = {
  createFacilities,
  getAllFacilities,
  getSingleFacilities,
  updateFacilities,
  deleteFacilities,
};
