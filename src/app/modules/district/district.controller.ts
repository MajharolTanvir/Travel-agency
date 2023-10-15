import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { DistrictsServices } from './district.services';
import { districtFilterAbleField } from './district.constant';

const createDistrict = catchAsync(async (req: Request, res: Response) => {
  const result = await DistrictsServices.createDistrict(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'District created successfully',
    data: result,
  });
});

const getAllDistrict = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, districtFilterAbleField);
  const options = pick(req.query, paginationFields);
  const result = await DistrictsServices.getAllDistrict(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Districts retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDistrict = catchAsync(async (req: Request, res: Response) => {
  const result = await DistrictsServices.getSingleDistrict(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'District retrieved successfully',
    data: result,
  });
});

const updateDistrict = catchAsync(async (req: Request, res: Response) => {
  const result = await DistrictsServices.updateDistrict(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'District updated successfully',
    data: result,
  });
});

const deleteDistrict = catchAsync(async (req: Request, res: Response) => {
  const result = await DistrictsServices.deleteDistrict(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'District deleted successfully',
    data: result,
  });
});

export const DistrictsController = {
  createDistrict,
  getAllDistrict,
  getSingleDistrict,
  updateDistrict,
  deleteDistrict,
};
