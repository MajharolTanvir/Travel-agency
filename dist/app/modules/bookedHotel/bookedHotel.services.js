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
exports.BookedHotelServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const createBookedHotel = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedHotel = yield prisma_1.prisma.bookedHotel.create({
        data: bookingData,
    });
    return bookedHotel;
});
const getBookedHotel = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookedHotel = yield prisma_1.prisma.bookedHotel.findMany({
        include: {
            room: true,
        },
    });
    return bookedHotel;
});
const singleBookedHotel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedHotel = yield prisma_1.prisma.bookedHotel.findFirst({
        where: {
            id,
        },
        include: {
            room: true,
        },
    });
    return bookedHotel;
});
const updateBookedHotel = (id, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedHotel = yield prisma_1.prisma.bookedHotel.update({
        where: {
            id,
        },
        data: bookingData,
        include: {
            room: true,
        },
    });
    return bookedHotel;
});
const deleteBookedHotel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedHotel = yield prisma_1.prisma.bookedHotel.delete({
        where: {
            id,
        },
    });
    return bookedHotel;
});
exports.BookedHotelServices = {
    createBookedHotel,
    getBookedHotel,
    singleBookedHotel,
    updateBookedHotel,
    deleteBookedHotel,
};
