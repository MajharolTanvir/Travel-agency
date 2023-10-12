import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AddToCartController } from './addToCart.controller';
import { AddToCartZodValidation } from './addToCart.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AddToCartZodValidation.createAddToCart),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AddToCartController.createAddToCart
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AddToCartController.getAllAddToCart
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AddToCartController.deleteAddToCart   
);

export const AddToCartRouter = router;
