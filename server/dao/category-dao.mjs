import { Category } from "../models/Category.mjs";
import { ApiError } from "../utils/error.mjs";

export const categoriesDao = {
  async create(data) {
    const category = new Category(data);

    return await category.save();
  },

  async get(id) {
    const category = await Category.findOne({ id });
    if (!category) {
      throw ApiError.notFound();
    }

    const subcategories = await this.getByParentCategory(id);
    return { ...category.toObject(), subcategories };
  },

  async list() {
    return await Category.find({});
  },

  async update(id, data) {
    return await Category.findOneAndUpdate({ id }, data, { new: true });
  },

  async delete(id) {
    const children = await this.getByParentCategory(id);
    if (children.length > 0) {
      throw ApiError.forbidden("Must not have any child categories");
    }

    // TODO: Check for items using given category

    return await Category.deleteOne({ id });
  },

  async getByParentCategory(parentCategoryId) {
    return await Category.find({ parentCategoryId });
  },

  async getCategoryTree(id) {
    const category = await Category.findOne({ id });
    if (!category) {
      throw ApiError.notFound();
    }

    const children = await this.getByParentCategory(id);
    const tree = {
      ...category.toObject(),
      subcategories: await Promise.all(
        children.map(async (child) => await this.getCategoryTree(child.id))
      ),
    };

    return tree;
  },
};
