"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersValidation = void 0;
const zod_1 = require("zod");
const signupZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: 'First name is required',
        }),
        lastName: zod_1.z.string({
            required_error: 'Last name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        token: zod_1.z.string().optional(),
    }),
});
const signinZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const userProfileZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        contactNo: zod_1.z.string({
            required_error: 'Contact no is required',
        }),
        presentAddress: zod_1.z.string({
            required_error: 'Present address is required',
        }),
        profileImage: zod_1.z.string({
            required_error: 'Profile image url is required',
        }),
        shopName: zod_1.z.string().optional(),
        shopContactNo: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        division: zod_1.z.string().optional(),
        district: zod_1.z.string().optional(),
        area: zod_1.z.string().optional(),
        nidNumber: zod_1.z.string().optional(),
        treadLicenseNo: zod_1.z.string().optional(),
    }),
});
exports.UsersValidation = {
    signupZodSchema,
    signinZodSchema,
    userProfileZodSchema,
};
