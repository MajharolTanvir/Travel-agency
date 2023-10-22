import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BookedPackageServices } from './bookedPackage.services';

const createBookedPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedPackageServices.createBookedPackage(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package booked successfully',
    data: result,
  });
});

const getBookedPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedPackageServices.getBookedPackage();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked package retrieved successfully',
    data: result,
  });
});

const singleBookedPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedPackageServices.singleBookedPackage(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked single packaged retrieved successfully',
    data: result,
  });
});

const updateBookedPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedPackageServices.updateBookedPackage(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked package updated successfully',
    data: result,
  });
});

const deleteBookedPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedPackageServices.deleteBookedPackage(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked package deleted successfully',
    data: result,
  });
});

export const BookedPackageController = {
  createBookedPackage,
  getBookedPackage,
  singleBookedPackage,
  updateBookedPackage,
  deleteBookedPackage,
};
