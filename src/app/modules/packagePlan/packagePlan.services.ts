import { PackagePlaces, PackagePlan, Prisma } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IPackageFilterType } from './packagePlan.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { packageFilterAbleField } from './packagePlan.constant';

const createPackage = async (data: PackagePlan) => {
  const result = await prisma.packagePlan.create({
    data,
    include: {
      guide: true,
      hotel: true,
      PackagePlaces: true,
      Reviews: true,
    },
  });

  return result;
};

const getAllPackage = async (
  filters: IPackageFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: packageFilterAbleField.map(field => ({
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

  const whereCondition: Prisma.PackagePlanWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.packagePlan.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      guide: true,
      hotel: true,
      PackagePlaces: true,
      Reviews: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.packagePlan.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSinglePackage = async (id: string) => {
  const result = await prisma.packagePlan.findFirst({
    where: {
      id,
    },
    include: {
      guide: true,
      hotel: true,
      PackagePlaces: true,
      Reviews: true,
    },
  });

  return result;
};

const updatePackage = async (id: string, data: Partial<PackagePlan>) => {
  const result = await prisma.packagePlan.update({
    where: {
      id,
    },
    data,
    include: {
      guide: true,
      hotel: true,
      PackagePlaces: true,
      Reviews: true,
    },
  });

  return result;
};

const deletePackage = async (id: string) => {
  const result = await prisma.packagePlan.delete({
    where: {
      id,
    },
  });

  return result;
};

const createPackagePlaces = async (data: PackagePlaces) => {
  const result = await prisma.packagePlaces.createMany({
    data,
  });

  return result;
};

const updatePackagePlaces = async (id: string, data: PackagePlaces) => {
  const result = await prisma.packagePlaces.update({
    where: {
      id
    },
    data,
  });

  return result;
};

export const PackagePlanServices = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  updatePackage,
  deletePackage,
  createPackagePlaces,
  updatePackagePlaces
}
