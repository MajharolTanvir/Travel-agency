import { z } from 'zod';

const createAddToCart = z.object({
  body: z.object({
    roomId: z.string().optional(),
    districtId: z.string().optional(),
    byRoadTransportId: z.string().optional(),
    byBoatTransportId: z.string().optional(),
    byAirTransportId: z.string().optional(),
    packageId: z.string().optional(),
  }),
});



export const AddToCartZodValidation = {
  createAddToCart,
};
