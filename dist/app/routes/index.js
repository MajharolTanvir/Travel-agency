"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addToCart_router_1 = require("../modules/addToCart/addToCart.router");
const district_router_1 = require("../modules/district/district.router");
const division_router_1 = require("../modules/division/division.router");
const facilitiesOptions_router_1 = require("../modules/facilitiesOptions/facilitiesOptions.router");
const hotel_router_1 = require("../modules/hotel/hotel.router");
const place_router_1 = require("../modules/place/place.router");
const profile_router_1 = require("../modules/profile/profile.router");
const room_router_1 = require("../modules/room/room.router");
const roomFacilities_router_1 = require("../modules/roomFacilities/roomFacilities.router");
const users_router_1 = require("../modules/users/users.router");
const bookedHotel_router_1 = require("../modules/bookedHotel/bookedHotel.router");
const review_router_1 = require("../modules/review/review.router");
const blog_router_1 = require("../modules/blog/blog.router");
const feedBackForm_router_1 = require("../modules/feedBackForm/feedBackForm.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        routes: users_router_1.UsersRouter,
    },
    {
        path: '/profile',
        routes: profile_router_1.ProfileRouter,
    },
    {
        path: '/divisions',
        routes: division_router_1.DivisionRouter,
    },
    {
        path: '/districts',
        routes: district_router_1.DistrictRouter,
    },
    {
        path: '/places',
        routes: place_router_1.PlaceRouter,
    },
    {
        path: '/hotels',
        routes: hotel_router_1.HotelRouter,
    },
    {
        path: '/rooms',
        routes: room_router_1.RoomRouter,
    },
    {
        path: '/facilities',
        routes: facilitiesOptions_router_1.FacultiesRouter,
    },
    {
        path: '/room-facilities',
        routes: roomFacilities_router_1.RoomFacilitiesRouter,
    },
    {
        path: '/add-to-cart',
        routes: addToCart_router_1.AddToCartRouter,
    },
    {
        path: '/booked-hotel',
        routes: bookedHotel_router_1.BookedHotelRouter,
    },
    {
        path: '/review',
        routes: review_router_1.ReviewRouter,
    },
    {
        path: '/blog',
        routes: blog_router_1.BlogRouter,
    },
    {
        path: '/feedback',
        routes: feedBackForm_router_1.FeedbackRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
