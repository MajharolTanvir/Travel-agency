"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomZodValidation = void 0;
const zod_1 = require("zod");
const createRoom = zod_1.z.object({
    body: zod_1.z.object({
        roomType: zod_1.z.string({
            required_error: 'Room type is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        roomImages: zod_1.z.array(zod_1.z.object({
            url: zod_1.z.string({
                required_error: 'Room image is required',
            }),
        })),
        roomPrice: zod_1.z.number({
            required_error: 'Price is required',
        }),
        checkInTime: zod_1.z.string({
            required_error: 'Check in time is required',
        }),
        checkOutTime: zod_1.z.string({
            required_error: 'Check out time is required',
        }),
        hotelId: zod_1.z.string({
            required_error: 'Hotel is required',
        }),
    }),
});
const updateRoom = zod_1.z.object({
    body: zod_1.z.object({
        roomType: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        roomImage: zod_1.z.string().optional(),
        roomPrice: zod_1.z.number().optional(),
        checkInTime: zod_1.z.string().optional(),
        checkOutTime: zod_1.z.string().optional(),
        hotelId: zod_1.z.string().optional(),
    }),
});
exports.RoomZodValidation = {
    createRoom,
    updateRoom,
};
