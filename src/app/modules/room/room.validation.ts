import { z } from 'zod';

const createRoom = z.object({
  body: z.object({
    roomType: z.string({
      required_error: 'Room type is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    roomImages: z.array(
      z.object({
        url: z.string({
          required_error: 'Room image is required',
        }),
      })
    ),
    roomPrice: z.number({
      required_error: 'Price is required',
    }),
    checkInTime: z.string({
      required_error: 'Check in time is required',
    }),
    checkOutTime: z.string({
      required_error: 'Check out time is required',
    }),
    hotelId: z.string({
      required_error: 'Hotel is required',
    }),
  }),
});

const updateRoom = z.object({
  body: z.object({
    roomType: z.string().optional(),
    description: z.string().optional(),
    roomImage: z.string().optional(),
    roomPrice: z.number().optional(),
    checkInTime: z.string().optional(),
    checkOutTime: z.string().optional(),
    hotelId: z.string().optional(),
  }),
});

export const RoomZodValidation = {
  createRoom,
  updateRoom,
};
