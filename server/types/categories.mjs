import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  parentCategoryId: z.string().nullable().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  parentCategoryId: z.string().nullable().optional(),
});
