import User from "../models/User.mjs";
import { ApiError } from "../utils/index.mjs";

class userDao {
  static async get(id) {
    const user = await User.findById(id);
    if (!user) {
      throw ApiError.notFound("User not found");
    }
    return user;
  }

  static async getByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw { code: "failedToFindUser", message: error.message };
    }
  }

  static async findById(id) {
    return await User.findById(id);
  }

  static async delete(id) {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      throw ApiError.notFound("User not found");
    }
    return result;
  }

  static async create(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  static async wishlistByUserId(id) {
    const user = await User.findById(id, "wishlist_array");
    if (!user) {
      throw ApiError.notFound("Wishlist not found");
    }
    return user.wishlist_array;
  }

  static async cartByUserId(id) {
    const user = await User.findById(id, "cart_array");
    if (!user) {
      throw ApiError.notFound("Cart not found");
    }
    return user.cart_array;
  }

  static async searchByFilter(filters) {
    return await User.find(filters);
  }

  static async update(id, updatedData) {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      throw ApiError.notFound("User not found or update failed");
    }
    return updatedUser;
  }

  static async list({ limit = 10, page = 0 } = {}) {
    limit = parseInt(limit, 10);
    page = parseInt(page, 10);

    const users = await User.find({})
      .skip(page * limit)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    return { users, totalPages: Math.ceil(totalUsers / limit), currentPage: page };
  }
}

export default userDao;
