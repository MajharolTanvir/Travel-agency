"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const hotel_validation_1 = require("./hotel.validation");
const hotel_controller_1 = require("./hotel.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(hotel_validation_1.HotelZodValidation.createHotel), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), hotel_controller_1.HotelsController.createHotel);
router.get('/', hotel_controller_1.HotelsController.getAllHotel);
router.get('/:id', hotel_controller_1.HotelsController.getSingleHotel);
router.patch('/:id', (0, validateRequest_1.default)(hotel_validation_1.HotelZodValidation.updateHotel), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), hotel_controller_1.HotelsController.updateHotel);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), hotel_controller_1.HotelsController.deleteHotel);
exports.HotelRouter = router;
