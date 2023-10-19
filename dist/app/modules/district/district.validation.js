"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictZodValidation = void 0;
const zod_1 = require("zod");
const createDistrict = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        divisionId: zod_1.z.string({
            required_error: "Division id is required"
        }),
    }),
});
const updateDistrict = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        divisionId: zod_1.z.string().optional(),
    }),
});
exports.DistrictZodValidation = {
    createDistrict,
    updateDistrict,
};