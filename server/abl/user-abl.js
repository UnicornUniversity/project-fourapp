import userDao from "../dao/user-dao.js";
import { ApiError } from "../utils/index.mjs";

class UserAbl {
  static async getUser(userId) {
    const user = await userDao.get(userId);
    if (!user) {
      throw ApiError.notFound("User not found");
    }
    return user;
  }

  static async getWishlist(userId) {
    const wishlist = await userDao.wishlistByUserId(userId);
    if (!wishlist || wishlist.length === 0) {
      throw ApiError.notFound("Wishlist not found");
    }
    return wishlist;
  }

  static async addItemToWishlist(userId, productId, variantId) {
    return await userDao.addItemToWishlist(userId, productId, variantId);
  }
  
  static async getCart(userId) {
    const cart = await userDao.cartByUserId(userId);
    if (!cart || cart.length === 0) {
      throw ApiError.notFound("Cart not found");
    }
    return cart;
  }

  static async updateUser(userId, updatedData) {
    const updatedUser = await userDao.update(userId, updatedData);
    if (!updatedUser) {
      throw ApiError.notFound("User not found or update failed");
    }
    return updatedUser;
  }

  static async deleteUser(userId) {
    const deletedUser = await userDao.delete(userId);
    if (!deletedUser) {
      throw ApiError.notFound("User not found or deletion failed");
    }
    return deletedUser;
  }

  static async listUsers({ limit = 10, page = 0 } = {}) {
    const result = await userDao.list({ limit, page });
    if (!result || result.users.length === 0) {
      throw ApiError.notFound("No users found");
    }
    return result;
  }

  static async searchByFilters(filters) {
    const query = {};
    
    if (filters.name) {
      query.name = { $regex: filters.name, $options: "i" };
    }
    if (filters.phonenumber) {
      query.phone_number = { $regex: filters.phone_number, $options: "i" };
    }
    if (filters.email) {
      query.email = { $regex: filters.email, $options: "i" };
    }
  
    const users = await userDao.searchByFilter(query);
    if (!users || users.length === 0) {
      throw ApiError.notFound("No users found with the given filters");
    }
    return users;
  }  

    static async addItemToCart(userId, productId, variantId, quantity) {
      return await userDao.addItemToCart(userId, productId, variantId, quantity);
    }

    static async removeItemFromCart(userId, productId, variantId) {
      return await userDao.removeItemFromCart(userId, productId, variantId);
    }
    
    static async removeItemFromWishlist(userId, productId, variantId) {
      return await userDao.removeItemFromWishlist(userId, productId, variantId);
    }
    
    static async updateCartItemQuantity(userId, productId, variantId, quantity) {
      return await userDao.updateCartItemQuantity(userId, productId, variantId, quantity);
    }
    

}

export default UserAbl;