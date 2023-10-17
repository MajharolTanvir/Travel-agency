import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BookedHotelServices } from './bookedHotel.services';

const createBookedHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedHotelServices.createBookedHotel(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hotel booked successfully',
    data: result,
  });
});

const getBookedHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedHotelServices.getBookedHotel();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked hotel retrieved successfully',
    data: result,
  });
});

const singleBookedHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedHotelServices.singleBookedHotel(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked single hotel retrieved successfully',
    data: result,
  });
});

const updateBookedHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedHotelServices.updateBookedHotel(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked hotel updated successfully',
    data: result,
  });
});

const deleteBookedHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedHotelServices.deleteBookedHotel(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked hotel deleted successfully',
    data: result,
  });
});

export const BookedHotelController = {
  createBookedHotel,
  getBookedHotel,
  singleBookedHotel,
  updateBookedHotel,
  deleteBookedHotel,
};
