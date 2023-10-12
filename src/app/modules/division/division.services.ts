import { Division, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { divisionSearchAbleField } from './division.constant';
import { IDivisionFilterType } from './division.interface';

const createDivision = async (data: Division) => {
  const division = await prisma.division.create({
      data,
  });

  return division;
};

const getAllDivision = async (
  filters: IDivisionFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: divisionSearchAbleField.map(field => ({
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

  const whereCondition: Prisma.DivisionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const division = await prisma.division.findMany({
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

  const total = await prisma.division.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: division,
  };
};

const getSingleDivision = async (id: string) => {
  const division = await prisma.division.findFirst({
    where: {
      id,
    },
  });

  return division;
};

const updateDivision = async (id: string, data: Partial<Division>) => {
  const division = await prisma.division.update({
    where: {
      id,
    },
    data,
  });

  return division;
};

const deleteDivision = async (id: string) => {
  const division = await prisma.division.delete({
    where: {
      id,
    },
  });

  return division;
};

export const DivisionsServices = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
