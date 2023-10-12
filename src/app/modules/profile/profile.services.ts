import { Prisma, Profile } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { userSearchAbleField } from './profile.constant';
import { IUserFilterType } from './profile.interface';

const profileUpdate = async (id: string, data: Partial<Profile>) => {
  const updateProfile = await prisma.profile.update({
    where: {
      userId: id,
    },
    data,
  });

  return updateProfile;
};

const getProfile = async (id: string) => {
  const profile = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      Profile: true,
    },
  });

  return profile;
};

const getSingleProfile = async (id: string) => {
  const profile = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      Profile: true,
    },
  });

  return profile;
};

const getAllProfile = async (
  filters: IUserFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchAbleField.map(field => ({
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

  const whereCondition: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const profile = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      Profile: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: profile,
  };
};

export const ProfileService = {
  profileUpdate,
  getProfile,
  getSingleProfile,
  getAllProfile,
};
