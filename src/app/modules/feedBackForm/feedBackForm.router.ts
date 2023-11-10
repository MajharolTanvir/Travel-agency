import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedBackForm.controller';

const router = express.Router();

router.get('/:id', FeedbackController.getSingleFeedback);
router.get('/', FeedbackController.getAllFeedback);

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
