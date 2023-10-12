import express from 'express';
import { UsersRouter } from '../modules/users/users.router';
import { ProfileRouter } from '../modules/profile/profile.router';
import { DivisionRouter } from '../modules/division/division.router';
import { DistrictRouter } from '../modules/district/district.router';
import { PlaceRouter } from '../modules/place/place.router';

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
    path: '/divisions',
    routes: DivisionRouter,
  },
  {
    path: '/districts',
    routes: DistrictRouter,
  },
  {
    path: '/places',
    routes: PlaceRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
