import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BlogController } from './blog.controller';

const router = express.Router();

router.get('/:id', BlogController.getSingleBlog);
router.get('/', BlogController.getAllBlog);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.GUIDE),
  BlogController.createBlog
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.GUIDE),
  BlogController.updateBlog
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.GUIDE),
  BlogController.deleteBlog
);

export const BlogRouter = router;
