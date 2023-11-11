"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const district_validation_1 = require("./district.validation");
const district_controller_1 = require("./district.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(district_validation_1.DistrictZodValidation.createDistrict), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), district_controller_1.DistrictsController.createDistrict);
router.get('/', district_controller_1.DistrictsController.getAllDistrict);
router.get('/:id', district_controller_1.DistrictsController.getSingleDistrict);
router.patch('/:id', (0, validateRequest_1.default)(district_validation_1.DistrictZodValidation.updateDistrict), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), district_controller_1.DistrictsController.updateDistrict);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DISTRICT_COORDINATOR), district_controller_1.DistrictsController.deleteDistrict);
exports.DistrictRouter = router;
