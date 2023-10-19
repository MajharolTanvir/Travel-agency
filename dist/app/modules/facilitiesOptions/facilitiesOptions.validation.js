"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultiesZodValidation = void 0;
const zod_1 = require("zod");
const createFacilities = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        image: zod_1.z.string({
            required_error: 'Facilities image is required',
        }),
    }),
});
const updateFacilities = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.FacultiesZodValidation = {
    createFacilities,
    updateFacilities,
};
