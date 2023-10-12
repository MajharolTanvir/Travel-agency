import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DivisionsServices } from './division.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { divisionFilterAbleField } from './division.constant';

const createDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionsServices.createDivision(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Division created successfully',
    data: result,
  });
});

const getAllDivision = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, divisionFilterAbleField);
  const options = pick(req.query, paginationFields);
  const result = await DivisionsServices.getAllDivision(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Divisions retrieved successfully',
    data: result,
  });
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionsServices.getSingleDivision(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Division retrieved successfully',
    data: result,
  });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionsServices.updateDivision(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Division updated successfully',
    data: result,
  });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionsServices.deleteDivision(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Division deleted successfully',
    data: result,
  });
});

export const DivisionsController = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
