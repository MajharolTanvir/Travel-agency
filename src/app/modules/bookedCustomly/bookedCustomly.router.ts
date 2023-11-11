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
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.TRAVELER
  ),
  CustomBookingController.getBooked
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
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
    ENUM_USER_ROLE.ADMIN
  ),
  CustomBookingController.updateBooked
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.TRAVELER),
  CustomBookingController.deleteBooked
);

router.post(
  '/create-transport',
  auth(ENUM_USER_ROLE.TRAVELER),
  CustomBookingController.createTransportBooked
);

router.patch(
  '/:id/transport-booked',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.TRAVELER,
    ENUM_USER_ROLE.ADMIN
  ),
  CustomBookingController.updateTransportBooked
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.TRAVELER),
  CustomBookingController.deleteTransportBooked
);

export const CustomBookedRouter = router;
