import User from "../models/User.mjs";

class userDao {
  static async getByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw { code: "failedToFindUser", message: error.message };
    }
  }

  static async findById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw { code: "failedToFindUser", message: error.message };
    }
  }

  static async create(userData) {
    try {
      const user = new User(userData);
      await user.save();
    } catch (error) {
      throw { code: "failedToCreateUser", message: error.message };
    }
  }

  static async wishlistByUserId(id) {
    try {
      const user = await User.findById(id, "wishlist_array");
      return user ? user.wishlist_array : [];
    } catch (error) {
      throw { code: "failedToGetWishlist", message: error.message };
    }
  }

  static async cartByUserId(id) {
    try {
      const user = await User.findById(id, "cart_array");
      return user ? user.cart_array : [];
    } catch (error) {
      throw { code: "failedToGetCart", message: error.message };
    }
  }

  static async searchByFilter(filters) {
    try {
      return await User.find(filters);
    } catch (error) {
      throw { code: "failedToSearchUsers", message: error.message };
    }
  }

  static async update(id, updatedData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        throw { code: "failedToUpdateUser", message: "User not found." };
      }
      return updatedUser;
    } catch (error) {
      throw { code: "failedToUpdateUser", message: error.message };
    }
  }

  static async list() {
    try {
      return await User.find({});
    } catch (error) {
      throw { code: "failedToListUsers", message: error.message };
    }
  }
  
}

export default userDao;
