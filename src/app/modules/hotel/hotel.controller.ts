import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { HotelsServices } from './hotel.services';
import { hotelFilterAbleField } from './hotel.constant';

const createHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await HotelsServices.createHotel(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hotel created successfully',
    data: result,
  });
});

const getAllHotel = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, hotelFilterAbleField);
  const options = pick(req.query, paginationFields);
  const result = await HotelsServices.getAllHotel(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hotels retrieved successfully',
    meta:result.meta,
    data: result.data,
  });
});

const getSingleHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await HotelsServices.getSingleHotel(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DHotel retrieved successfully',
    data: result,
  });
});

const updateHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await HotelsServices.updateHotel(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hotel updated successfully',
    data: result,
  });
});

const deleteHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await HotelsServices.deleteHotel(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hotel deleted successfully',
    data: result,
  });
});

export const HotelsController = {
  createHotel,
  getAllHotel,
  getSingleHotel,
  updateHotel,
  deleteHotel,
};
