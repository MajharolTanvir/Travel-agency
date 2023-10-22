import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TransportsController } from './transport.controller';
import { TransportZodValidation } from './transport.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(TransportZodValidation.createTransport),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.HEAD_MANAGER),
  TransportsController.createTransport
);

router.get('/', TransportsController.getAllTransport);

router.get('/:id', TransportsController.getSingleTransport);

router.patch(
  '/:id',
  validateRequest(TransportZodValidation.updateTransport),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.HEAD_MANAGER),
  TransportsController.updateTransport
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.HEAD_MANAGER),
  TransportsController.deleteTransport
);

export const HotelRouter = router;
