import { z } from 'zod';

const createPackagePlan = z.object({
  body: z.object({
    packageName: z.string({
      required_error: 'Package name is required',
    }),
    thumbnail: z.string({
      required_error: 'Thumbnail is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    hotelId: z.string().optional(),
    guideId: z.string({
      required_error: 'Guide id is required',
    }),
    travelerSize: z.string({
      required_error: 'Traveler Size is required',
    }),
    startDate: z.string({
      required_error: 'Traveling start date is required',
    }),
    endDate: z.string({
      required_error: 'Traveling end date is required',
    }),
    StartLocation: z.string({
      required_error: 'Start location is required',
    }),
    endLocation: z.string({
      required_error: 'End location is required',
    }),
    contactManager: z.string({
      required_error: 'Manager Contact no is required',
    }),
  }),
});

const updatePackagePlan = z.object({
  body: z.object({
    packageName: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    hotelId: z.string().optional(),
    guideId: z.string().optional(),
    travelerSize: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    StartLocation: z.string().optional(),
    endLocation: z.string().optional(),
    contactManager: z.string().optional(),
  }),
});

export const PackagePlanValidation = {
  createPackagePlan,
  updatePackagePlan,
};
