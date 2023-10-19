"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidation = void 0;
const zod_1 = require("zod");
const profileUpdateZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        division: zod_1.z.string().optional(),
        district: zod_1.z.string().optional(),
        area: zod_1.z.string().optional(),
        nid: zod_1.z.string().optional(),
        passport: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
    }),
});
exports.ProfileValidation = {
    profileUpdateZodValidation,
};
