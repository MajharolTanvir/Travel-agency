import { Prisma, Transport } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { transportSearchAbleField } from './transport.constant';
import { ITransportFilterType } from './transport.interface';

const createTransport = async (transportData: Transport) => {
  const result = await prisma.transport.create({
    data: transportData,
    include: {
      district: true,
      Reviews: true,
    },
  });

  return result;
};

const getAllTransport = async (
  filters: ITransportFilterType,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: transportSearchAbleField.map(field => ({
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

  const whereCondition: Prisma.TransportWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.transport.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      district: true,
      Reviews: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.transport.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleTransport = async (id: string) => {
  const result = await prisma.transport.findFirst({
    where: {
      id,
    },
    include: {
      district: true,
    },
  });

  return result;
};

const updateTransport = async (id: string, data: Partial<Transport>) => {
  const result = await prisma.transport.update({
    where: {
      id,
    },
    data,
    include: {
      district: true,
    },
  });

  return result;
};

const deleteTransport = async (id: string) => {
  const result = await prisma.transport.delete({
    where: {
      id,
    },
  });

  return result;
};

export const TransportsServices = {
  createTransport,
  getAllTransport,
  getSingleTransport,
  updateTransport,
  deleteTransport,
};
