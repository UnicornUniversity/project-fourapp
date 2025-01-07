import {
  createCategorySchema,
  updateCategorySchema,
} from "../types/categories.mjs";
import { ApiError } from "../utils/error.mjs";
import { categoriesDao } from "../dao/category-dao.mjs";

export class CategoryAbl {
  static async get(id) {
    return await categoriesDao.get(id);
  }

  static async create(data) {
    const parsed = createCategorySchema.parse(data);

    return await categoriesDao.create(parsed);
  }

  static async update(id, data) {
    try {
      const parsed = updateCategorySchema.parse(data);
      const updatedCategory = await categoriesDao.update(id, parsed);
      if (!updatedCategory) {
        throw ApiError.notFound("Category not found");
      }

      return updatedCategory;
    } catch (error) {
      throw ApiError.fromError(error, "Failed to update category");
    }
  }

  static async delete(id) {
    try {
      await categoriesDao.delete(id);
    } catch (error) {
      throw ApiError.fromError(error, "Failed to delete category");
    }
  }

  static async list() {
    try {
      return await categoriesDao.list();
    } catch (error) {
      throw ApiError.fromError(error, "Failed to list categories");
    }
  }

  static async getSubcategories(id) {
    try {
      return await categoriesDao.getByParentCategory(id);
    } catch (error) {
      throw ApiError.fromError(error, "Failed to get subcategories");
    }
  }

  static async getCategoryTree(id) {
    try {
      return await categoriesDao.getCategoryTree(id);
    } catch (error) {
      throw ApiError.fromError(error, "Failed to get category tree");
    }
  }

  static async getAllCategoriesTree(){
    try {
      return await categoriesDao.getAllCategoriesTree();
    } catch (error) {
      throw ApiError.fromError(error, "Failed to get categories tree");
    }
  }
}
