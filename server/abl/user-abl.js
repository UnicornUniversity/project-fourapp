import userDao from '../dao/user-dao.js';

class UserAbl {
  static async getWishlist(userId) {
    const wishlist = await userDao.wishlistByUserId(userId);
    if (!wishlist) throw { code: 'wishlistNotFound', message: 'Wishlist not found' };
    return wishlist;
  }

  static async getCart(userId) {
    const cart = await userDao.cartByUserId(userId);
    if (!cart) throw { code: 'cartNotFound', message: 'Cart not found' };
    return cart;
  }

  static async updateUser(userId, updatedData) {
    const updatedUser = await userDao.update(userId, updatedData);
    if (!updatedUser) throw { code: 'userUpdateFailed', message: 'User not found or update failed' };
    return updatedUser;
  }

  static async deleteUser(userId) {
    const deletedUser = await userDao.delete(userId);
    if (!deletedUser) throw { code: 'userDeleteFailed', message: 'User not found or deletion failed' };
    return deletedUser;
  }

  static async listUsers({ limit = 10, page = 1 } = {}) {
    const result = await userDao.list({ limit, page });
    if (!result.users.length) throw { code: 'noUsersFound', message: 'No users found' };
    return result;
  }

  static async searchByFilters(filters) {
    const users = await userDao.searchByFilter(filters);
    if (!users.length) throw { code: 'noUsersFound', message: 'No users match the given filters' };
    return users;
  }
}

export default UserAbl;
