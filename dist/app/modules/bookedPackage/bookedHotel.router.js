"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookedPackageRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const bookedPackage_controller_1 = require("./bookedPackage.controller");
const router = express_1.default.Router();
router.post('/', 
//   validateRequest(PlaceZodValidation.createPlace),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER, user_1.ENUM_USER_ROLE.TRAVELER), bookedPackage_controller_1.BookedPackageController.createBookedPackage);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER, user_1.ENUM_USER_ROLE.TRAVELER), bookedPackage_controller_1.BookedPackageController.getBookedPackage);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER, user_1.ENUM_USER_ROLE.TRAVELER), bookedPackage_controller_1.BookedPackageController.singleBookedPackage);
router.patch('/:id', 
//   validateRequest(PlaceZodValidation.updatePlace),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER), bookedPackage_controller_1.BookedPackageController.updateBookedPackage);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), bookedPackage_controller_1.BookedPackageController.deleteBookedPackage);
exports.BookedPackageRouter = router;
