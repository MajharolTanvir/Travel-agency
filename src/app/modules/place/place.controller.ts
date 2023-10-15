import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { PlacesServices } from './place.services';
import { placeFilterAbleField } from './place.constant';

const createPlace = catchAsync(async (req: Request, res: Response) => {
  const result = await PlacesServices.createPlace(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Place created successfully',
    data: result,
  });
});

const getAllPlace = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, placeFilterAbleField);
  const options = pick(req.query, paginationFields);
  const result = await PlacesServices.getAllPlace(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Place retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePlace = catchAsync(async (req: Request, res: Response) => {
  const result = await PlacesServices.getSinglePlace(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Place retrieved successfully',
    data: result,
  });
});

const updatePlace = catchAsync(async (req: Request, res: Response) => {
  const result = await PlacesServices.updatePlace(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Place updated successfully',
    data: result,
  });
});

const deletePlace = catchAsync(async (req: Request, res: Response) => {
  const result = await PlacesServices.deletePlace(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Place deleted successfully',
    data: result,
  });
});

export const PlacesController = {
  createPlace,
  getAllPlace,
  getSinglePlace,
  updatePlace,
  deletePlace,
};
