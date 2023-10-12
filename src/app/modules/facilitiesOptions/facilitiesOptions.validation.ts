import { z } from 'zod';

const createFacilities = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    image: z.string({
      required_error: 'Facilities image is required',
    }),
  }),
});

const updateFacilities = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const FacultiesZodValidation = {
  createFacilities,
  updateFacilities,
};
