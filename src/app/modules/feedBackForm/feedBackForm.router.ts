import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedBackForm.controller';

const router = express.Router();

router.get('/:id', FeedbackController.getSingleFeedback);
router.get('/', FeedbackController.getAllFeedback);

router.post(
  '/create-blog',
  auth(ENUM_USER_ROLE.USER),
  FeedbackController.createFeedback
);

router.patch(
  '/update-blog',
  auth(ENUM_USER_ROLE.USER),
  FeedbackController.updateFeedback
);

router.delete(
  '/delete-blog',
  auth(ENUM_USER_ROLE.USER),
  FeedbackController.deleteFeedback
);

export const FeedbackRouter = router;
