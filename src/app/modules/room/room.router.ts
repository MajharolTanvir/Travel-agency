import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoomZodValidation } from './room.validation';
import { RoomsController } from './room.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(RoomZodValidation.createRoom),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  RoomsController.createRoom
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  RoomsController.getAllRoom
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  RoomsController.getSingleRoom
);

router.patch(
  '/:id',
  validateRequest(RoomZodValidation.updateRoom),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  RoomsController.updateRoom
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  RoomsController.deleteRoom
);

export const RoomRouter = router;
