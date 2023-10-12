import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoomFacilitiesZodValidation } from './roomFacilities.validation';
import { RoomFacilitiesController } from './roomFacilities.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(RoomFacilitiesZodValidation.createRoomFacilities),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  RoomFacilitiesController.createRoomFacilities
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  RoomFacilitiesController.getAllRoomFacilities
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  RoomFacilitiesController.getSingleRoomFacilities
);

router.patch(
  '/:id',
  validateRequest(RoomFacilitiesZodValidation.updateRoomFacilities),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  RoomFacilitiesController.updateRoomFacilities
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  RoomFacilitiesController.deleteRoomFacilities
);

export const RoomFacilitiesRouter = router;
