import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.addReview),
  ReviewController.addReview
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  ReviewController.getAllReview
);


router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  ReviewController.updateReview
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  ReviewController.deleteReview
);

export const ReviewRouter = router;
