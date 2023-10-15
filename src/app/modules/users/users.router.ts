import express from 'express';
import { UsersValidation } from './users.validation';
import { UsersController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UsersValidation.signupZodSchema), 
  UsersController.signup
);
router.post('/signin',validateRequest(UsersValidation.signinZodSchema), UsersController.signin);

router.post('/forget-password', UsersController.forgetPassword);
router.post('/reset-password', UsersController.resetPassword);

router.get(
  '/admins',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UsersController.getAllAdmin
);

export const UsersRouter = router;
