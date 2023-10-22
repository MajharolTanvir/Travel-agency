import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CustomBookingController } from './bookedCustomly.controller';

const router = express.Router();

router.post(
  '/',
  //   validateRequest(PlaceZodValidation.createPlace),
  auth(ENUM_USER_ROLE.TRAVELER),
  CustomBookingController.createBooked
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.HEAD_MANAGER,
    ENUM_USER_ROLE.TRAVELER
  ),
  CustomBookingController.getBooked
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.HEAD_MANAGER,
    ENUM_USER_ROLE.TRAVELER
  ),
  CustomBookingController.singleBooked
);

router.patch(
  '/:id',
  //   validateRequest(PlaceZodValidation.updatePlace),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.TRAVELER,
    ENUM_USER_ROLE.HEAD_MANAGER
  ),
  CustomBookingController.updateBooked
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.TRAVELER),
  CustomBookingController.deleteBooked
);

export const CustomBookedRouter = router;
