import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookedHotelController } from './bookedHotel.controller';

const router = express.Router();

router.post(
  '/',
  //   validateRequest(PlaceZodValidation.createPlace),
  auth(ENUM_USER_ROLE.TRAVELER),
  BookedHotelController.createBookedHotel
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.HEAD_MANAGER, ENUM_USER_ROLE.TRAVELER),
  BookedHotelController.getBookedHotel
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.HEAD_MANAGER,
    ENUM_USER_ROLE.TRAVELER
  ),
  BookedHotelController.singleBookedHotel
);

router.patch(
  '/:id',
  //   validateRequest(PlaceZodValidation.updatePlace),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.TRAVELER,
    ENUM_USER_ROLE.HEAD_MANAGER
  ),
  BookedHotelController.updateBookedHotel
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.TRAVELER),
  BookedHotelController.deleteBookedHotel
);

export const BookedHotelRouter = router;
