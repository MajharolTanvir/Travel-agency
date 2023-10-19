import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { DistrictZodValidation } from './district.validation';
import { DistrictsController } from './district.controller';
const router = express.Router();

router.post(
  '/',
  validateRequest(DistrictZodValidation.createDistrict),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  DistrictsController.createDistrict
);

router.get(
  '/',
  DistrictsController.getAllDistrict
);

router.get(
  '/:id',
  DistrictsController.getSingleDistrict
);

router.patch(
  '/:id',
  validateRequest(DistrictZodValidation.updateDistrict),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  DistrictsController.updateDistrict
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  DistrictsController.deleteDistrict
);

export const DistrictRouter = router;
