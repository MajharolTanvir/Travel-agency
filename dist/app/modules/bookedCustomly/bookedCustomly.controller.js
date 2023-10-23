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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomBookingController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const bookedCustomly_services_1 = require("./bookedCustomly.services");
const createBooked = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookedCustomly_services_1.customBookingServices.createBookedCustomly(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Custom booked successfully',
        data: result,
    });
}));
const getBooked = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookedCustomly_services_1.customBookingServices.getBookedCustomly();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Custom Bookeds retrieved successfully',
        data: result,
    });
}));
const singleBooked = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookedCustomly_services_1.customBookingServices.singleBookedCustomly(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Custom booked retrieved successfully',
        data: result,
    });
}));
const updateBooked = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookedCustomly_services_1.customBookingServices.updateBookedCustomly(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Custom booked updated successfully',
        data: result,
    });
}));
const deleteBooked = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookedCustomly_services_1.customBookingServices.deleteBookedCustomly(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Custom booked deleted successfully',
        data: result,
    });
}));
const createTransportBooked = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookedCustomly_services_1.customBookingServices.createTransportBooked(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Transport booked successfully',
        data: result,
    });
}));
const updateTransportBooked = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookedCustomly_services_1.customBookingServices.updateTransportBooked(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Transport booked updated successfully',
        data: result,
    });
}));
const deleteTransportBooked = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookedCustomly_services_1.customBookingServices.deleteTransportBooked(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Custom booked deleted successfully',
        data: result,
    });
}));
exports.CustomBookingController = {
    createBooked,
    getBooked,
    singleBooked,
    updateBooked,
    deleteBooked,
    createTransportBooked,
    updateTransportBooked,
    deleteTransportBooked,
};
