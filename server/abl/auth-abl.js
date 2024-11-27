import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userDao from '../dao/user-dao.js';

class AuthAbl {
  static async register({ name, email, password }) {
    const existingUser = await userDao.getByEmail(email);
    if (existingUser) {
      throw { code: "emailExists", message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = { name, email, password: hashedPassword };
    await userDao.create(newUser);

    return { message: "User registered successfully" };
  }

  static async login({ email, password }) {
    const user = await userDao.getByEmail(email);
    if (!user) {
      throw { code: "userNotFound", message: "User not found" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw { code: "invalidPassword", message: "Invalid password" };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { user: { id: user._id, email: user.email, role: user.role }, token };
  }

  static async getUserProfile(userId) {
    const user = await userDao.findById(userId);
    if (!user) {
      throw { code: "userNotFound", message: "User not found" };
    }
    return user;
  }
}

export default AuthAbl;
