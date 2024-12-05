import { ApiError } from "../utils/error.mjs";
import {
  createProductRequestSchema,
  updateProductRequestSchema,
} from "../types/products.mjs";
import { productsDao } from "../dao/product-dao.mjs";

export class ProductAbl {
  static async create(data) {
    try {
      const parsed = await createProductRequestSchema.parseAsync(data);

      return await productsDao.create(parsed);
    } catch (error) {
      throw ApiError.fromError(error);
    }
  }

  static async update(id, data) {
    try {
      const parsed = await updateProductRequestSchema.parseAsync(data);

      return await productsDao.update(id, parsed);
    } catch (error) {
      throw ApiError.fromError(error);
    }
  }

  static async delete(id) {
    try {
      await productsDao.delete(id);
    } catch (error) {
      throw ApiError.fromError(error);
    }
  }

  static async list(filters) {
    try {
      return await productsDao.listByFilter(filters);
    } catch (error) {
      throw ApiError.fromError(error);
    }
  }
}
