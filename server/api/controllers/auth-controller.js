import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import authMiddleware from "../../middleware/auth-middleware.js";
import userDao from "../../dao/user-dao.js";

const router = express.Router();

class AuthController {
  // Register user
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!AuthController.validateEmail(email)) {
        return res.status(400).json({ code: "invalidEmail", message: "Invalid email format" });
      }

      if (!AuthController.validatePassword(password)) {
        return res
          .status(400)
          .json({ code: "weakPassword", message: "Password must be at least 6 characters long and include a number" });
      }

      const existingUser = await userDao.existsByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ code: "emailExists", message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await userDao.create({ name, email, password: hashedPassword });

      console.log(`User registered successfully: ${email}`);
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res
        .status(400)
        .json({ code: err.code || "failedToCreateUser", message: err.message });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userDao.getByEmail(email);
      if (!user) {
        console.log(`Login failed: User not found for email ${email}`);
        return res.status(400).json({ code: "userNotFound", message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ code: "invalidPassword", message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      setTokenCookie(res , token)
      
      console.log(`User logged in successfully: ${email}`);
      res
        .status(200)
        .json({ user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
      res
        .status(400)
        .json({ code: err.code || "failedToLogin", message: err.message });
    }
  }

  // Email validation function
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password validation function
  static validatePassword(password) {
    return password.length >= 6 && /\d/.test(password);
  }

  // Get user profile
  static async getUserProfile(req, res) {
    try {
      const user = await userDao.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ code: "userNotFound", message: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      res
        .status(400)
        .json({ code: err.code || "failedToFetchUser", message: err.message });
    }
  }
}

// Routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", authMiddleware, AuthController.getUserProfile);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    setTokenCookie(res , token)

    res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
  }
);

function setTokenCookie(res, token){
  res.cookie("token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", //in production change to Strict
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
}

export default router;
