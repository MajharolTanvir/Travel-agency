"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackFormService = void 0;
const prisma_1 = require("../../../shared/prisma");
const createFeedback = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.feedbackForm.create({
        data,
    });
});
const getAllFeedback = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'user') {
        return yield prisma_1.prisma.feedbackForm.findMany({
            where: {
                userId: id,
            },
        });
    }
    else {
        return yield prisma_1.prisma.feedbackForm.findMany({});
    }
});
const getSingleFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.feedbackForm.findUnique({
        where: {
            id,
        },
    });
});
const updateFeedback = (id, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.feedbackForm.update({
        where: {
            id,
            userId: userId,
        },
        data,
    });
});
const deleteFeedback = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.feedbackForm.delete({
        where: {
            id,
            userId: userId,
        },
    });
});
exports.FeedbackFormService = {
    createFeedback,
    getAllFeedback,
    getSingleFeedback,
    updateFeedback,
    deleteFeedback,
};
