import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedBackForm.controller';

const router = express.Router();

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.TRAVELER,
    ENUM_USER_ROLE.DISTRICT_COORDINATOR,
    ENUM_USER_ROLE.GUIDE,
    ENUM_USER_ROLE.MANAGERS,
    ENUM_USER_ROLE.SUPPORT
  ),
  FeedbackController.getSingleFeedback
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  FeedbackController.getAllFeedback
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.TRAVELER),
  FeedbackController.createFeedback
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.TRAVELER),
  FeedbackController.updateFeedback
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FeedbackController.deleteFeedback
);

export const FeedbackRouter = router;
