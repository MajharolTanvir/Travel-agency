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
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = require("../../../shared/prisma");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51OAR7HA5j9z44Pg1nReLXxLECwBCr3xCYuUULC6ygHec2tOGYkvAnGN7ptzlmeMjtRh2ShKFOqwJxzGY6cKtiVgb007qEHSTkN');
const createBookedPackage = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedPackage = yield prisma_1.prisma.bookedPackage.create({
        data: bookingData,
    });
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: bookedPackage.totalCost,
        currency: 'usd',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
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
    return { clientSecret: paymentIntent.client_secret, id: bookedPackage.id };
});
const getBookedPackage = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookedPackage = yield prisma_1.prisma.bookedPackage.findMany({
        include: {
            user: true,
            packagePlan: true,
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
            packagePlan: true,
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
    const packageData = yield prisma_1.prisma.bookedPackage.findFirst({
        where: {
            id,
        },
        include: {
            packagePlan: true,
        },
    });
    const travelerSize = packageData && packageData.packagePlan.bookedTraveler - packageData.travelingMember;
    yield prisma_1.prisma.packagePlan.update({
        where: {
            id: packageData === null || packageData === void 0 ? void 0 : packageData.packageId,
        },
        data: {
            bookedTraveler: travelerSize,
        },
    });
    const bookedPackage = yield prisma_1.prisma.bookedPackage.delete({
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
