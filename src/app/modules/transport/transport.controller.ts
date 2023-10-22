import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { TransportsServices } from './transport.services';
import { transportFilterAbleField } from './transport.constant';

const createTransport = catchAsync(async (req: Request, res: Response) => {
  const result = await TransportsServices.createTransport(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transport created successfully',
    data: result,
  });
});

const getAllTransport = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, transportFilterAbleField);
  const options = pick(req.query, paginationFields);
  const result = await TransportsServices.getAllTransport(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transports retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTransport = catchAsync(async (req: Request, res: Response) => {
  const result = await TransportsServices.getSingleTransport(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transport retrieved successfully',
    data: result,
  });
});

const updateTransport = catchAsync(async (req: Request, res: Response) => {
  const result = await TransportsServices.updateTransport(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transport updated successfully',
    data: result,
  });
});

const deleteTransport = catchAsync(async (req: Request, res: Response) => {
  const result = await TransportsServices.deleteTransport(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transport deleted successfully',
    data: result,
  });
});

export const TransportsController = {
  createTransport,
  getAllTransport,
  getSingleTransport,
  updateTransport,
  deleteTransport,
};
