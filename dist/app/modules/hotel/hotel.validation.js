"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelZodValidation = void 0;
const zod_1 = require("zod");
const createHotel = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        hotelImage: zod_1.z.string({
            required_error: 'Hotel image is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        location: zod_1.z.string({
            required_error: 'Location is required',
        }),
        mapLocationUrl: zod_1.z.string().optional(),
        districtId: zod_1.z.string({
            required_error: 'District id is required',
        }),
    }),
});
const updateHotel = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        hotelImage: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        mapLocationUrl: zod_1.z.string().optional(),
        districtId: zod_1.z.string().optional(),
    }),
});
exports.HotelZodValidation = {
    createHotel,
    updateHotel,
};
