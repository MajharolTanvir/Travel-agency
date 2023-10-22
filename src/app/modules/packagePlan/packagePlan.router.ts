import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PackagePlanController } from './packagePlan.controller';
import { PackagePlanValidation } from './packagePlan.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(PackagePlanValidation.createPackagePlan),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  PackagePlanController.createPackage
);

router.post(
  '/package-places',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  PackagePlanController.createPackagePlaces
);

router.get('/', PackagePlanController.getAllPackage);

router.get('/:id', PackagePlanController.getSinglePackage);

router.patch(
  '/:id',
  validateRequest(PackagePlanValidation.updatePackagePlan),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  PackagePlanController.updatePackage
);

router.patch(
  '/:id/package-places',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  PackagePlanController.updatePackagePlaces
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  PackagePlanController.deletePackage
);

export const PackagePlanRouter = router;
