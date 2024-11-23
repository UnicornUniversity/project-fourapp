import User from "../models/User.mjs";

class userDao {
  static async getByEmail(email) {
    try {
      return User.findOne({ email });
    } catch (error) {
      throw { code: "failedToFindUser", message: error.message };
    }
  }

  static async findById(id) {
    try {
      return User.findById(id);
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
}

export default userDao;
