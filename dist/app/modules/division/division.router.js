"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivisionRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const division_controller_1 = require("./division.controller");
const division_validation_1 = require("./division.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(division_validation_1.DivisionZodValidation.createDivision), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), division_controller_1.DivisionsController.createDivision);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.TRAVELER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), division_controller_1.DivisionsController.getAllDivision);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.TRAVELER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR, user_1.ENUM_USER_ROLE.MANAGERS, user_1.ENUM_USER_ROLE.SUPPORT, user_1.ENUM_USER_ROLE.GUIDE), division_controller_1.DivisionsController.getSingleDivision);
router.patch('/:id', (0, validateRequest_1.default)(division_validation_1.DivisionZodValidation.updateDivision), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), division_controller_1.DivisionsController.updateDivision);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), division_controller_1.DivisionsController.deleteDivision);
exports.DivisionRouter = router;
