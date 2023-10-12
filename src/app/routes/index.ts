import express from 'express';
import { UsersRouter } from '../modules/users/users.router';
import { ProfileRouter } from '../modules/profile/profile.router';
import { DivisionRouter } from '../modules/division/division.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    routes: UsersRouter,
  },
  {
    path: '/profile',
    routes: ProfileRouter,
  },
  {
    path: '/division',
    routes: DivisionRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
