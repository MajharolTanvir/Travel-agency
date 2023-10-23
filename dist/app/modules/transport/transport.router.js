"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const transport_controller_1 = require("./transport.controller");
const transport_validation_1 = require("./transport.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(transport_validation_1.TransportZodValidation.createTransport), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER), transport_controller_1.TransportsController.createTransport);
router.get('/', transport_controller_1.TransportsController.getAllTransport);
router.get('/:id', transport_controller_1.TransportsController.getSingleTransport);
router.patch('/:id', (0, validateRequest_1.default)(transport_validation_1.TransportZodValidation.updateTransport), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER), transport_controller_1.TransportsController.updateTransport);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.HEAD_MANAGER), transport_controller_1.TransportsController.deleteTransport);
exports.TransportRouter = router;
