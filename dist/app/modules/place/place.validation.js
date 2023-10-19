"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceZodValidation = void 0;
const zod_1 = require("zod");
const createPlace = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        placeImage: zod_1.z.string({
            required_error: 'Image is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        districtId: zod_1.z.string({
            required_error: 'District id is required',
        }),
    }),
});
const updatePlace = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        placeImage: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        districtId: zod_1.z.string().optional(),
    }),
});
exports.PlaceZodValidation = {
    createPlace,
    updatePlace,
};
