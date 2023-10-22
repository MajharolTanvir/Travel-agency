import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { customBookingServices } from './bookedCustomly.services';

const createBooked = catchAsync(async (req: Request, res: Response) => {
  const result = await customBookingServices.createBookedCustomly(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Custom booked successfully',
    data: result,
  });
});

const getBooked = catchAsync(async (req: Request, res: Response) => {
  const result = await customBookingServices.getBookedCustomly();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Custom Bookeds retrieved successfully',
    data: result,
  });
});

const singleBooked = catchAsync(async (req: Request, res: Response) => {
  const result = await customBookingServices.singleBookedCustomly(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Custom booked retrieved successfully',
    data: result,
  });
});

const updateBooked = catchAsync(async (req: Request, res: Response) => {
  const result = await customBookingServices.updateBookedCustomly(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Custom booked updated successfully',
    data: result,
  });
});

const deleteBooked = catchAsync(async (req: Request, res: Response) => {
  const result = await customBookingServices.deleteBookedCustomly(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Custom booked deleted successfully',
    data: result,
  });
});

export const CustomBookingController = {
  createBooked,
  getBooked,
  singleBooked,
  updateBooked,
  deleteBooked,
};
