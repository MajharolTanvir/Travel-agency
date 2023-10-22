import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileController } from './profile.controller';
import { ProfileValidation } from './profile.validation';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  ProfileController.changeRole
);

router.patch(
  '/',
  auth(ENUM_USER_ROLE.TRAVELER, ENUM_USER_ROLE.HEAD_MANAGER, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ProfileValidation.profileUpdateZodValidation),
  ProfileController.profileUpdate
);

router.get(
  '/user-profile',
  auth(
    ENUM_USER_ROLE.TRAVELER,
    ENUM_USER_ROLE.HEAD_MANAGER,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  ProfileController.getProfile
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.TRAVELER, ENUM_USER_ROLE.SUPER_ADMIN),
  ProfileController.getSingleProfile
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.TRAVELER,
    ENUM_USER_ROLE.HEAD_MANAGER,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  ProfileController.getAllProfile
);


router.patch(
  '/change-role/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  ProfileController.profileUpdate
);

export const ProfileRouter = router;
