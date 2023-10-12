import { z } from "zod";



const createDivision = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        })
    })
})

const updateDivision = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const DivisionZodValidation = {
    createDivision,
    updateDivision
} 