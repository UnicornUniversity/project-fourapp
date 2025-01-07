import { Product } from "../models/Product.mjs";
import { ApiError } from "../utils/error.mjs";
import { Category } from "../models/Category.mjs";
import { Types } from "mongoose";

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
    categories,
    maxPrice,
    minPrice,
    colors,
    sizes,
    page = 0,
    pageSize,
  }) {
    const query = {};

    if (search)
      query.name = {
        $regex: search,
        $options: "i",
      };
    if (categories && categories.length > 0) {
      query.categories = {
        $in: categories.map(Types.ObjectId.createFromHexString),
      };
    }
    if (maxPrice !== undefined) {
      query.price = { ...query.price, $lte: maxPrice };
    }
    if (minPrice !== undefined) {
      query.price = { ...query.price, $gte: minPrice };
    }
    if (colors && colors.length > 0) {
      query["variants.color"] = { $in: colors };
    }
    if (sizes && sizes.length > 0) {
      query["variants.size"] = { $in: sizes };
    }

    const products = await Product.find(query)
      .skip(page * pageSize)
      .limit(pageSize);

    return {
      products,
      total: await Product.countDocuments(query),
    };
  },

  async getLatest(limit = 5) {
    return await Product.find({}).sort({ createdAt: -1 }).limit(limit);
  },

  async addVariant(productId, variantData) {
    const product = await productsDao.get(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    product.variants.push(variantData);
    return await productsDao.update(productId, product);
  },
};
