"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomFacilitiesRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const roomFacilities_validation_1 = require("./roomFacilities.validation");
const roomFacilities_controller_1 = require("./roomFacilities.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(roomFacilities_validation_1.RoomFacilitiesZodValidation.createRoomFacilities), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), roomFacilities_controller_1.RoomFacilitiesController.createRoomFacilities);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), roomFacilities_controller_1.RoomFacilitiesController.getAllRoomFacilities);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), roomFacilities_controller_1.RoomFacilitiesController.getSingleRoomFacilities);
router.patch('/:id', (0, validateRequest_1.default)(roomFacilities_validation_1.RoomFacilitiesZodValidation.updateRoomFacilities), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), roomFacilities_controller_1.RoomFacilitiesController.updateRoomFacilities);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), roomFacilities_controller_1.RoomFacilitiesController.deleteRoomFacilities);
exports.RoomFacilitiesRouter = router;
