"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagePlanValidation = void 0;
const zod_1 = require("zod");
const createPackagePlan = zod_1.z.object({
    body: zod_1.z.object({
        packageName: zod_1.z.string({
            required_error: 'Package name is required',
        }),
        thumbnail: zod_1.z.string({
            required_error: 'Thumbnail is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        hotelId: zod_1.z.string().optional(),
        guideId: zod_1.z.string({
            required_error: 'Guide id is required',
        }),
        travelerSize: zod_1.z.string({
            required_error: 'Traveler Size is required',
        }),
        startDate: zod_1.z.string({
            required_error: 'Traveling start date is required',
        }),
        endDate: zod_1.z.string({
            required_error: 'Traveling end date is required',
        }),
        StartLocation: zod_1.z.string({
            required_error: 'Start location is required',
        }),
        endLocation: zod_1.z.string({
            required_error: 'End location is required',
        }),
        contactManager: zod_1.z.string({
            required_error: 'Manager Contact no is required',
        }),
    }),
});
const updatePackagePlan = zod_1.z.object({
    body: zod_1.z.object({
        packageName: zod_1.z.string().optional(),
        thumbnail: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        hotelId: zod_1.z.string().optional(),
        guideId: zod_1.z.string().optional(),
        travelerSize: zod_1.z.string().optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        StartLocation: zod_1.z.string().optional(),
        endLocation: zod_1.z.string().optional(),
        contactManager: zod_1.z.string().optional(),
    }),
});
exports.PackagePlanValidation = {
    createPackagePlan,
    updatePackagePlan,
};
