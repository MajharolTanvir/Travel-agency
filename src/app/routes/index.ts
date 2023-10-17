import express from 'express';
import { AddToCartRouter } from '../modules/addToCart/addToCart.router';
import { DistrictRouter } from '../modules/district/district.router';
import { DivisionRouter } from '../modules/division/division.router';
import { FacultiesRouter } from '../modules/facilitiesOptions/facilitiesOptions.router';
import { HotelRouter } from '../modules/hotel/hotel.router';
import { PlaceRouter } from '../modules/place/place.router';
import { ProfileRouter } from '../modules/profile/profile.router';
import { RoomRouter } from '../modules/room/room.router';
import { RoomFacilitiesRouter } from '../modules/roomFacilities/roomFacilities.router';
import { UsersRouter } from '../modules/users/users.router';
import { BookedHotelRouter } from '../modules/bookedHotel/bookedHotel.router';
import { ReviewRouter } from '../modules/review/review.router';
import { BlogRouter } from '../modules/blog/blog.router';
import { FeedbackRouter } from '../modules/feedBackForm/feedBackForm.router';

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
  {
    path: '/hotels',
    routes: HotelRouter,
  },
  {
    path: '/rooms',
    routes: RoomRouter,
  },
  {
    path: '/facilities',
    routes: FacultiesRouter,
  },
  {
    path: '/room-facilities',
    routes: RoomFacilitiesRouter,
  },
  {
    path: '/add-to-cart',
    routes: AddToCartRouter,
  },
  {
    path: '/booked-hotel',
    routes: BookedHotelRouter,
  },
  {
    path: '/review',
    routes: ReviewRouter,
  },
  {
    path: '/blog',
    routes: BlogRouter,
  },
  {
    path: '/feedback',
    routes: FeedbackRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
