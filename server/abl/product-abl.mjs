import {
  createProductRequestSchema,
  updateProductRequestSchema,
} from "../types/products.mjs";
import { productsDao } from "../dao/product-dao.mjs";

export class ProductAbl {
  static async create(data) {
    const parsed = await createProductRequestSchema.parseAsync(data);

    return await productsDao.create(parsed);
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
  static async get(id){
    return await productsDao.get(id)
  }
}
