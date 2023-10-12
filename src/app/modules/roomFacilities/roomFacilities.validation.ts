import { z } from 'zod';

const createRoomFacilities = z.object({
  body: z.object({
    roomId: z.string({
      required_error: 'Title is required',
    }),
    FacilitiesOptionsId: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateRoomFacilities = z.object({
  body: z.object({
    roomId: z.string().optional(),
    FacilitiesOptionsId: z.string().optional(),
  }),
});

export const RoomFacilitiesZodValidation = {
  createRoomFacilities,
  updateRoomFacilities,
};
