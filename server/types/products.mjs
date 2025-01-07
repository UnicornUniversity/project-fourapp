import { z } from "zod";

export const productVariantSchema = z.object({
  name: z.string().min(1),
  size: z.string().optional(),
  color: z.string().optional(),
  stock: z.number().int().nonnegative(),
  images: z.array(z.string()).optional(),
});

export const createProductRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  isOnline: z.boolean(),
  variants: z.array(productVariantSchema).nonempty(),
  categories: z.array(z.string()).optional(),
});

export const updateProductRequestSchema = createProductRequestSchema.partial();

export const listProductsQuerySchema = z.object({
  search: z.string().optional(),
  categories: z.array(z.string()).optional(),
  maxPrice: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  page: z.coerce.number().int().optional(),
  pageSize: z.coerce.number().int().optional(),
});
