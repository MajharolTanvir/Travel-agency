"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const place_validation_1 = require("./place.validation");
const place_controller_1 = require("./place.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(place_validation_1.PlaceZodValidation.createPlace), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), place_controller_1.PlacesController.createPlace);
router.get('/', place_controller_1.PlacesController.getAllPlace);
router.get('/:id', place_controller_1.PlacesController.getSinglePlace);
router.patch('/:id', (0, validateRequest_1.default)(place_validation_1.PlaceZodValidation.updatePlace), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), place_controller_1.PlacesController.updatePlace);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), place_controller_1.PlacesController.deletePlace);
exports.PlaceRouter = router;
