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
exports.customBookingServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const createBookedCustomly = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const customBooking = yield prisma_1.prisma.bookedCustomly.create({
        data: bookingData,
    });
    return customBooking;
});
const getBookedCustomly = () => __awaiter(void 0, void 0, void 0, function* () {
    const customBooking = yield prisma_1.prisma.bookedCustomly.findMany({
        include: {
            room: true,
        },
    });
    return customBooking;
});
const singleBookedCustomly = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customBooking = yield prisma_1.prisma.bookedCustomly.findFirst({
        where: {
            id,
        },
        include: {
            room: true,
        },
    });
    return customBooking;
});
const updateBookedCustomly = (id, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const customBooking = yield prisma_1.prisma.bookedCustomly.update({
        where: {
            id,
        },
        data: bookingData,
        include: {
            room: true,
        },
    });
    return customBooking;
});
const deleteBookedCustomly = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customBooking = yield prisma_1.prisma.bookedCustomly.delete({
        where: {
            id,
        },
    });
    return customBooking;
});
const createTransportBooked = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const transportBooking = yield prisma_1.prisma.transportBooked.create({
        data: bookingData,
    });
    return transportBooking;
});
const updateTransportBooked = (id, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const transportBooking = yield prisma_1.prisma.transportBooked.update({
        where: {
            bookedId: id,
        },
        data: bookingData,
    });
    return transportBooking;
});
const deleteTransportBooked = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customBooking = yield prisma_1.prisma.transportBooked.delete({
        where: {
            bookedId: id,
        },
    });
    return customBooking;
});
exports.customBookingServices = {
    createBookedCustomly,
    getBookedCustomly,
    singleBookedCustomly,
    updateBookedCustomly,
    deleteBookedCustomly,
    createTransportBooked,
    updateTransportBooked,
    deleteTransportBooked,
};
