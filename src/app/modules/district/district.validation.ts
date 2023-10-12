import { z } from 'zod';

const createDistrict = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
      divisionId: z.string({
        required_error: "Division id is required"
    }),
  }),
});

const updateDistrict = z.object({
  body: z.object({
    title: z.string().optional(),
    divisionId: z.string().optional(),
  }),
});

export const DistrictZodValidation = {
  createDistrict,
  updateDistrict,
};
