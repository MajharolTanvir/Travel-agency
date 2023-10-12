import { District, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IDistrictFilterType } from './district.interface';
import { districtSearchAbleField } from './district.constant';

const createDistrict = async (data: District) => {
  const District = await prisma.district.create({
    data,
  });

  return District;
};

const getAllDistrict = async (
  filters: IDistrictFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: districtSearchAbleField.map(field => ({
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

  const whereCondition: Prisma.DistrictWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const district = await prisma.district.findMany({
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

  const total = await prisma.district.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: district,
  };
};

const getSingleDistrict = async (id: string) => {
  const district = await prisma.district.findFirst({
    where: {
      id,
    },
  });

  return district;
};

const updateDistrict = async (id: string, data: Partial<District>) => {
  const district = await prisma.district.update({
    where: {
      id,
    },
    data,
  });

  return district;
};

const deleteDistrict = async (id: string) => {
  const district = await prisma.district.delete({
    where: {
      id,
    },
  });

  return district;
};

export const DistrictsServices = {
  createDistrict,
  getAllDistrict,
  getSingleDistrict,
  updateDistrict,
  deleteDistrict,
};
