import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomFacilitiesFilterAbleField } from './roomFacilities.constant';
import { RoomFacilitiesServices } from './roomFacilities.services';

const createRoomFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomFacilitiesServices.createRoomFacilities(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Facilities created successfully',
    data: result,
  });
});

const getAllRoomFacilities = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFacilitiesFilterAbleField);
  const options = pick(req.query, paginationFields);
  const result = await RoomFacilitiesServices.getAllRoomFacilities(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Facilities retrieved successfully',
    data: result,
  });
});

const getSingleRoomFacilities = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RoomFacilitiesServices.getSingleRoomFacilities(
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room Facilities retrieved successfully',
      data: result,
    });
  }
);

const updateRoomFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomFacilitiesServices.updateRoomFacilities(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Facilities updated successfully',
    data: result,
  });
});

const deleteRoomFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomFacilitiesServices.deleteRoomFacilities(
    req.params.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Facilities deleted successfully',
    data: result,
  });
});

export const RoomFacilitiesController = {
  createRoomFacilities,
  getAllRoomFacilities,
  getSingleRoomFacilities,
  updateRoomFacilities,
  deleteRoomFacilities,
};
