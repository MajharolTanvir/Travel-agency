import express from 'express';
import { UsersRouter } from '../modules/users/users.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    routes: UsersRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
