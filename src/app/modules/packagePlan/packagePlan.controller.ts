import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { PackagePlanServices } from './packagePlan.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { packageFilterAbleField } from './packagePlan.constant';

const createPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackagePlanServices.createPackage(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package created successfully!',
    data: result,
  });
});

const getAllPackage = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, packageFilterAbleField);
  const options = pick(req.query, paginationFields);

  const result = await PackagePlanServices.getAllPackage(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Packages retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackagePlanServices.getSinglePackage(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package retrieved successfully!',
    data: result,
  });
});

const updatePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackagePlanServices.updatePackage(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package updated successfully!',
    data: result,
  });
});

const deletePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackagePlanServices.deletePackage(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package deleted successfully!',
    data: result,
  });
});

export const PackagePlanController = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  updatePackage,
  deletePackage,
};