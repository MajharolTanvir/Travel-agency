import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { HotelZodValidation } from './hotel.validation';
import { HotelsController } from './hotel.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(HotelZodValidation.createHotel),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MANAGERS,
    ENUM_USER_ROLE.DISTRICT_COORDINATOR
  ),
  HotelsController.createHotel
);

router.get(
  '/',
  HotelsController.getAllHotel
);

router.get(
  '/:id',
  HotelsController.getSingleHotel
);

router.patch(
  '/:id',
  validateRequest(HotelZodValidation.updateHotel),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MANAGERS,
    ENUM_USER_ROLE.DISTRICT_COORDINATOR
  ),
  HotelsController.updateHotel
);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MANAGERS,
    ENUM_USER_ROLE.DISTRICT_COORDINATOR
  ),
  HotelsController.deleteHotel
);

export const HotelRouter = router;
