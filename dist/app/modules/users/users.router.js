"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_validation_1 = require("./users.validation");
const users_controller_1 = require("./users.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(users_validation_1.UsersValidation.signupZodSchema), users_controller_1.UsersController.signup);
router.post('/signin', (0, validateRequest_1.default)(users_validation_1.UsersValidation.signinZodSchema), users_controller_1.UsersController.signin);
router.post('/forget-password', users_controller_1.UsersController.forgetPassword);
router.post('/reset-password', users_controller_1.UsersController.resetPassword);
router.get('/admins', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), users_controller_1.UsersController.getAllAdmin);
exports.UsersRouter = router;
