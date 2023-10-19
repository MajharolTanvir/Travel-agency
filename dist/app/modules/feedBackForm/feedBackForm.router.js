"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const feedBackForm_controller_1 = require("./feedBackForm.controller");
const router = express_1.default.Router();
router.get('/:id', feedBackForm_controller_1.FeedbackController.getSingleFeedback);
router.get('/', feedBackForm_controller_1.FeedbackController.getAllFeedback);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), feedBackForm_controller_1.FeedbackController.createFeedback);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), feedBackForm_controller_1.FeedbackController.updateFeedback);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), feedBackForm_controller_1.FeedbackController.deleteFeedback);
exports.FeedbackRouter = router;
