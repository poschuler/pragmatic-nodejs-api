import z from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(10).max(500),
    price: z.number().min(0),
  }),
});