import { Product } from "../models/Product.mjs";
import { ApiError } from "../utils/error.mjs";
import { Category } from "../models/Category.mjs";

export const productsDao = {
  async create(data) {
    const product = new Product(data);

    return await product.save();
  },

  async get(id) {
    return await Product.findById(id);
  },

  async list() {
    return await Product.find({});
  },

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
  },

  async delete(id) {
    await Product.findByIdAndDelete(id);
  },

  async listByCategory(categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw ApiError.notFound("Failed to find category");
    }

    const categories = await Category.find({
      $or: [{ _id: categoryId }, { parentCategoryId: categoryId }],
    });
    const categoryIds = categories.map((x) => x.id);

    return await Product.find({ categoryId: { $in: categoryIds } });
  },

  async listByFilter({
    search,
    category,
    maxPrice,
    minPrice,
    color,
    page = 0,
    pageSize = 10,
  }) {
    const query = {};

    if (search)
      query.name = {
        $regex: search,
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
      .skip(page * pageSize)
      .limit(pageSize);

    return {
      products,
      total: await Product.countDocuments(query),
    };
  },
};
