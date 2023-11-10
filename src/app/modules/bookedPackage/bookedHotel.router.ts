import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookedPackageController } from './bookedPackage.controller';

const router = express.Router();

router.post(
  '/',
  //   validateRequest(PlaceZodValidation.createPlace),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.HEAD_MANAGER,
    ENUM_USER_ROLE.TRAVELER
  ),
  BookedPackageController.createBookedPackage
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.HEAD_MANAGER,
    ENUM_USER_ROLE.TRAVELER
  ),
  BookedPackageController.getBookedPackage
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.HEAD_MANAGER,
    ENUM_USER_ROLE.TRAVELER
  ),
  BookedPackageController.singleBookedPackage
);

router.patch(
  '/:id',
  //   validateRequest(PlaceZodValidation.updatePlace),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.HEAD_MANAGER),
  BookedPackageController.updateBookedPackage
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  BookedPackageController.deleteBookedPackage
);

export const BookedPackageRouter = router;
