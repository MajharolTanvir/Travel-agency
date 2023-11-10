import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PlaceZodValidation } from './place.validation';
import { PlacesController } from './place.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(PlaceZodValidation.createPlace),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  PlacesController.createPlace
);

router.get('/', PlacesController.getAllPlace);

router.get('/:id', PlacesController.getSinglePlace);

router.patch(
  '/:id',
  validateRequest(PlaceZodValidation.updatePlace),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  PlacesController.updatePlace
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  PlacesController.deletePlace
);

export const PlaceRouter = router;
