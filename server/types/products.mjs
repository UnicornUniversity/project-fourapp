import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  size: z.string().optional(),
  color: z.string().optional(),
  stock: z.number().int().nonnegative(),
  images: z.array(z.string()).optional(),
});

export const createProductRequestSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  isOnline: z.boolean(),
  variants: z.array(productVariantSchema).nonempty(),
  categories: z.array(z.number()).optional(),
});

export const updateProductRequestSchema = createProductRequestSchema
  .partial()
  .omit({ id: true });
