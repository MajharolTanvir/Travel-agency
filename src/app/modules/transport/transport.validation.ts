import { z } from 'zod';

const createTransport = z.object({
  body: z.object({
    transportName: z.string({
      required_error: 'Transport name is required',
    }),
    transportType: z.string({
      required_error: 'Transport type is required',
    }),
    transportImages: z.string({
      required_error: 'Transport images is required',
    }),
    transportPrice: z.number({
      required_error: 'Transport price is required',
    }),
    passengerSize: z.string({
      required_error: 'Passenger size is required',
    }),
    districtId: z.string({
      required_error: 'District id is required',
    }),
  }),
});

const updateTransport = z.object({
  body: z.object({
    transportName: z.string().optional(),
    transportType: z.string().optional(),
    transportImages: z.string().optional(),
    transportPrice: z.number().optional(),
    passengerSize: z.string().optional(),
    districtId: z.string().optional(),
  }),
});

export const TransportZodValidation = {
  createTransport,
  updateTransport,
};
