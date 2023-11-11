import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultiesZodValidation } from './facilitiesOptions.validation';
import { FacultiesController } from './facilitiesOptions.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(FacultiesZodValidation.createFacilities),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FacultiesController.createFacilities
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.TRAVELER
  ),
  FacultiesController.getAllFacilities
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.TRAVELER
  ),
  FacultiesController.getSingleFacilities
);

router.patch(
  '/:id',
  validateRequest(FacultiesZodValidation.updateFacilities),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FacultiesController.updateFacilities
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FacultiesController.deleteFacilities
);

export const FacultiesRouter = router;
