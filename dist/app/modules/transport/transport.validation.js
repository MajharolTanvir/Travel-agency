"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportZodValidation = void 0;
const zod_1 = require("zod");
const createTransport = zod_1.z.object({
    body: zod_1.z.object({
        transportName: zod_1.z.string({
            required_error: 'Transport name is required',
        }),
        transportType: zod_1.z.string({
            required_error: 'Transport type is required',
        }),
        transportImages: zod_1.z.string({
            required_error: 'Transport images is required',
        }),
        transportPrice: zod_1.z.number({
            required_error: 'Transport price is required',
        }),
        passengerSize: zod_1.z.string({
            required_error: 'Passenger size is required',
        }),
        districtId: zod_1.z.string({
            required_error: 'District id is required',
        }),
    }),
});
const updateTransport = zod_1.z.object({
    body: zod_1.z.object({
        transportName: zod_1.z.string().optional(),
        transportType: zod_1.z.string().optional(),
        transportImages: zod_1.z.string().optional(),
        transportPrice: zod_1.z.number().optional(),
        passengerSize: zod_1.z.string().optional(),
        districtId: zod_1.z.string().optional(),
    }),
});
exports.TransportZodValidation = {
    createTransport,
    updateTransport,
};
