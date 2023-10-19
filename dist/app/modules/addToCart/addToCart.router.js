"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const addToCart_controller_1 = require("./addToCart.controller");
const addToCart_validation_1 = require("./addToCart.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(addToCart_validation_1.AddToCartZodValidation.createAddToCart), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), addToCart_controller_1.AddToCartController.createAddToCart);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), addToCart_controller_1.AddToCartController.getAllAddToCart);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), addToCart_controller_1.AddToCartController.deleteAddToCart);
exports.AddToCartRouter = router;
