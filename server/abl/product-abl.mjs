import {
  createProductRequestSchema,
  updateProductRequestSchema,
  productVariantSchema,
} from "../types/products.mjs";
import { productsDao } from "../dao/product-dao.mjs";
import { ApiError } from "../utils/error.mjs";

export class ProductAbl {
  static async create(data) {
    const parsed = await createProductRequestSchema.parseAsync(data);

    return await productsDao.create(parsed);
  }

  static async addVariant(productId, variantData) {
    const parsed = await productVariantSchema.parseAsync(variantData);

    return await productsDao.addVariant(productId, parsed);
  }

  static async update(id, data) {
    const parsed = await updateProductRequestSchema.parseAsync(data);
    return await productsDao.update(id, parsed);
  }

  static async delete(id) {
    await productsDao.delete(id);
  }

  static async list(filters) {
    return await productsDao.listByFilter(filters);
  }

  static async get(id) {
    return await productsDao.get(id);
  }

  static async getLatest() {
    return await productsDao.getLatest();
  }

  static async updateVariantImages(productId, variantId, imageUrls) {
    const product = await productsDao.get(productId);

    if (!product) {
      throw ApiError.notFound("Product not found");
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      throw ApiError.notFound("Variant not found");
    }

    // Update variant images
    variant.images = imageUrls;

    return await productsDao.update(productId, product);
  }
}
