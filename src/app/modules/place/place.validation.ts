import { z } from 'zod';

const createPlace = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    placeImage: z.string({
      required_error: 'Image is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    districtId: z.string({
      required_error: 'District id is required',
    }),
  }),
});

const updatePlace = z.object({
  body: z.object({
    title: z.string().optional(),
    placeImage: z.string().optional(),
    description: z.string().optional(),
    districtId: z.string().optional(),
  }),
});

export const PlaceZodValidation = {
  createPlace,
  updatePlace,
};
