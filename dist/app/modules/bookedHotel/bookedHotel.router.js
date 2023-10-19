"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookedHotelRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const bookedHotel_controller_1 = require("./bookedHotel.controller");
const router = express_1.default.Router();
router.post('/', 
//   validateRequest(PlaceZodValidation.createPlace),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), bookedHotel_controller_1.BookedHotelController.createBookedHotel);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), bookedHotel_controller_1.BookedHotelController.getBookedHotel);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), bookedHotel_controller_1.BookedHotelController.singleBookedHotel);
router.patch('/:id', 
//   validateRequest(PlaceZodValidation.updatePlace),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), bookedHotel_controller_1.BookedHotelController.updateBookedHotel);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), bookedHotel_controller_1.BookedHotelController.deleteBookedHotel);
exports.BookedHotelRouter = router;
