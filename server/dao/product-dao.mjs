import { Product } from "../models/Product.mjs";
import { ApiError } from "../utils/error.mjs";
import { Category } from "../models/Category.mjs";

export const productsDao = {
  async create(data) {
    try {
      const product = new Product(data);

      return await product.save();
    } catch (error) {
      throw ApiError.fromError(error);
    }
  },

  async get(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw ApiError.fromError(error);
    }
  },

  async list() {
    try {
      return await Product.find();
    } catch (error) {
      throw ApiError.fromError(error);
    }
  },

  async update(object) {
    try {
      return await Product.findByIdAndUpdate(object.id, object, {
        new: true,
      });
    } catch (error) {
      throw ApiError.fromError(error);
    }
  },

  async delete(id) {
    try {
      await Product.findByIdAndDelete(id);
    } catch (error) {
      throw ApiError.fromError(error);
    }
  },

  async listByCategory(categoryId) {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw ApiError.notFound("Failed to find category");
      }

      const categories = await Category.find({
        $or: [{ _id: categoryId }, { parentCategoryId: categoryId }],
      });
      const categoryIds = categories.map((x) => x.id);

      return await Product.find({ categoryId: { $in: categoryIds } });
    } catch (err) {}
  },

  async listByFilter({
    searchQuery,
    category,
    maxPrice,
    minPrice,
    color,
    page = 0,
    pageSize = 10,
  }) {
    try {
      const query = {};

      if (searchQuery)
        query.name = {
          $regex: searchQuery,
          $options: "i",
        };
      if (category?.length) {
        query.categoryId = { $in: category };
      }
      if (maxPrice !== undefined) {
        query.price = { ...query.price, $lte: maxPrice };
      }
      if (minPrice !== undefined) {
        query.price = { ...query.price, $gte: minPrice };
      }
      if (color) {
        query["variants.color"] = color;
      }

      const products = await Product.find(query)
        .sort(sort)
        .skip(page * pageSize)
        .limit(pageSize);

      return {
        products,
        total: await Product.countDocuments(query),
      };
    } catch (error) {
      throw ApiError.fromError(error);
    }
  },
};
