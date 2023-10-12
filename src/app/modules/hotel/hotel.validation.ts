import { z } from 'zod';

const createHotel = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    hotelImage: z.string({
      required_error: 'Hotel image is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
    mapLocationUrl: z.string().optional(),
    districtId: z.string({
      required_error: 'District id is required',
    }),
  }),
});

const updateHotel = z.object({
  body: z.object({
    title: z.string().optional(),
    hotelImage: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    mapLocationUrl: z.string().optional(),
    districtId: z.string().optional(),
  }),
});

export const HotelZodValidation = {
  createHotel,
  updateHotel,
};
