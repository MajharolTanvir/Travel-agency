import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DivisionsController } from './division.controller';
import { DivisionZodValidation } from './division.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(DivisionZodValidation.createDivision),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  DivisionsController.createDivision
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.TRAVELER, ENUM_USER_ROLE.HEAD_MANAGER),
  DivisionsController.getAllDivision
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.TRAVELER,
    ENUM_USER_ROLE.HEAD_MANAGER
  ),
  DivisionsController.getSingleDivision
);

router.patch(
  '/:id',
  validateRequest(DivisionZodValidation.updateDivision),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  DivisionsController.updateDivision
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  DivisionsController.deleteDivision
);

export const DivisionRouter = router;
