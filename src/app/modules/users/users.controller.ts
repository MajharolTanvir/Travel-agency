import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UsersService } from './users.services';

const signup = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UsersService.signup(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signup successfully',
    data: result,
  });
});

const signin = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UsersService.signin(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await UsersService.forgetPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link sent successfully. Please check your email',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.query.token as string;
  const { password } = req.body;
  const result = await UsersService.resetPassword(token, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});



const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.getAllAdmin();
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  });
});



export const UsersController = {
  signup,
  signin,
  forgetPassword,
  resetPassword,
  getAllAdmin,
};
