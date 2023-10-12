import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { addToCartServices } from './addToCart.services';

const createAddToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await addToCartServices.createAddToCart(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service added successfully',
    data: result,
  });
});

const getAllAddToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await addToCartServices.getAllAddToCart();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const deleteAddToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await addToCartServices.deleteAddToCart(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service removed successfully',
    data: result,
  });
});

export const AddToCartController = {
  createAddToCart,
  getAllAddToCart,
  deleteAddToCart,
};
