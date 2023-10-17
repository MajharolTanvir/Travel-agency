import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackFormService } from './feedBackForm.services';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackFormService.createFeedback(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback posted successfully',
    data: result,
  });
});
const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackFormService.getAllFeedback();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedbacks retrieved successfully',
    data: result,
  });
});
const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackFormService.getSingleFeedback(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback retrieved  successfully',
    data: result,
  });
});
const updateFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeedbackFormService.updateFeedback(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback updated successfully',
    data: result,
  });
});
const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeedbackFormService.deleteFeedback(id as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback deleted successfully',
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
