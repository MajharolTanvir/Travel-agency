import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { FacilitiesServices } from './facilitiesOptions.services';
import { divisionFilterAbleField } from '../division/division.constant';

const createFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.createFacilities(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties options created successfully',
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, divisionFilterAbleField);
  const options = pick(req.query, paginationFields);
  const result = await FacilitiesServices.getAllFacilities(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties options retrieved successfully',
    data: result,
  });
});

const getSingleFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.getSingleFacilities(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties options retrieved successfully',
    data: result,
  });
});

const updateFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.updateFacilities(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties options updated successfully',
    data: result,
  });
});

const deleteFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilitiesServices.deleteFacilities(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties options deleted successfully',
    data: result,
  });
});

export const FacultiesController = {
  createFacilities,
  getAllFacilities,
  getSingleFacilities,
  updateFacilities,
  deleteFacilities,
};
