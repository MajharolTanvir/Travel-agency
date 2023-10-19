"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCartZodValidation = void 0;
const zod_1 = require("zod");
const createAddToCart = zod_1.z.object({
    body: zod_1.z.object({
        roomId: zod_1.z.string().optional(),
        districtId: zod_1.z.string().optional(),
        byRoadTransportId: zod_1.z.string().optional(),
        byBoatTransportId: zod_1.z.string().optional(),
        byAirTransportId: zod_1.z.string().optional(),
        packageId: zod_1.z.string().optional(),
    }),
});
exports.AddToCartZodValidation = {
    createAddToCart,
};
