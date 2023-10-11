import express from 'express';
import { UsersValidation } from './users.validation';
import { UsersController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UsersValidation.signupZodSchema),
  UsersController.signup
);
router.post('/signin',validateRequest(UsersValidation.signinZodSchema), UsersController.signin);

router.post('/forget-password', UsersController.forgetPassword);
router.post('/reset-password', UsersController.resetPassword);

export const UsersRouter = router;
