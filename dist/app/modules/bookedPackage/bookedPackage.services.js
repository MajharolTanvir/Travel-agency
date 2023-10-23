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
exports.BookedPackageServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createBookedPackage = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedPackage = yield prisma_1.prisma.bookedPackage.create({
        data: bookingData,
    });
    const traveler = yield prisma_1.prisma.packagePlan.findFirst({
        where: {
            id: bookedPackage.packageId,
        },
    });
    if (
    //@ts-ignore
    (traveler === null || traveler === void 0 ? void 0 : traveler.travelerSize) <
        //@ts-ignore
        (traveler === null || traveler === void 0 ? void 0 : traveler.bookedTraveler) + bookingData.travelingMember) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Trip member is full, Wait for next trip');
    }
    yield prisma_1.prisma.packagePlan.update({
        where: {
            id: traveler === null || traveler === void 0 ? void 0 : traveler.id,
        },
        data: {
            //@ts-ignore
            bookedTraveler: (traveler === null || traveler === void 0 ? void 0 : traveler.bookedTraveler) + bookedPackage.travelingMember,
        },
    });
    return bookedPackage;
});
const getBookedPackage = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookedPackage = yield prisma_1.prisma.bookedPackage.findMany({
        include: {
            user: true,
        },
    });
    return bookedPackage;
});
const singleBookedPackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedPackage = yield prisma_1.prisma.bookedPackage.findFirst({
        where: {
            id,
        },
        include: {
            user: true,
        },
    });
    return bookedPackage;
});
const updateBookedPackage = (id, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedPackage = yield prisma_1.prisma.bookedPackage.update({
        where: {
            id,
        },
        data: bookingData,
    });
    return bookedPackage;
});
const deleteBookedPackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedPackage = yield prisma_1.prisma.bookedHotel.delete({
        where: {
            id,
        },
    });
    return bookedPackage;
});
exports.BookedPackageServices = {
    createBookedPackage,
    getBookedPackage,
    singleBookedPackage,
    updateBookedPackage,
    deleteBookedPackage,
};
