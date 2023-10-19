"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomFacilitiesZodValidation = void 0;
const zod_1 = require("zod");
const createRoomFacilities = zod_1.z.object({
    body: zod_1.z.object({
        roomId: zod_1.z.string({
            required_error: 'Title is required',
        }),
        FacilitiesOptionsId: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
const updateRoomFacilities = zod_1.z.object({
    body: zod_1.z.object({
        roomId: zod_1.z.string().optional(),
        FacilitiesOptionsId: zod_1.z.string().optional(),
    }),
});
exports.RoomFacilitiesZodValidation = {
    createRoomFacilities,
    updateRoomFacilities,
};
