"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomBookedRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const bookedCustomly_controller_1 = require("./bookedCustomly.controller");
const router = express_1.default.Router();
router.post('/', 
//   validateRequest(PlaceZodValidation.createPlace),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.TRAVELER), bookedCustomly_controller_1.CustomBookingController.createBooked);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER, user_1.ENUM_USER_ROLE.TRAVELER), bookedCustomly_controller_1.CustomBookingController.getBooked);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER, user_1.ENUM_USER_ROLE.TRAVELER), bookedCustomly_controller_1.CustomBookingController.singleBooked);
router.patch('/:id', 
//   validateRequest(PlaceZodValidation.updatePlace),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.TRAVELER, user_1.ENUM_USER_ROLE.HEAD_MANAGER), bookedCustomly_controller_1.CustomBookingController.updateBooked);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TRAVELER), bookedCustomly_controller_1.CustomBookingController.deleteBooked);
router.post('/create-transport', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TRAVELER), bookedCustomly_controller_1.CustomBookingController.createTransportBooked);
router.patch('/:id/transport-booked', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.TRAVELER, user_1.ENUM_USER_ROLE.HEAD_MANAGER), bookedCustomly_controller_1.CustomBookingController.updateTransportBooked);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TRAVELER), bookedCustomly_controller_1.CustomBookingController.deleteTransportBooked);
exports.CustomBookedRouter = router;
