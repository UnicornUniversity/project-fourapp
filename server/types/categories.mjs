import { z } from "zod";

export const createCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  parentCategoryId: z.number().nullable().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  parentCategoryId: z.number().nullable().optional(),
});
