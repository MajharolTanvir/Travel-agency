import { AddToCartFields } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createAddToCart = async (data: AddToCartFields) => {
  const addToCart = await prisma.addToCartFields.create({
    data,
  });

  return addToCart;
};

const getAllAddToCart = async () => {
  const addToCart = await prisma.addToCartFields.findMany({
    include: {
      district: true,
      room: true,
    },
  });

  return addToCart;
};

const deleteAddToCart = async (id: string) => {
  const addToCart = await prisma.addToCartFields.delete({
    where: {
      id,
    },
  });

  return addToCart;
};

export const addToCartServices = {
  createAddToCart,
  getAllAddToCart,
  deleteAddToCart,
};
