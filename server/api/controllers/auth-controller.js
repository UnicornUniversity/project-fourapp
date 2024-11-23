const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const authMiddleware = require("../../middleware/auth-middleware");
const userDao = require("../../dao/user-dao");
const router = express.Router();

class AuthController {
  // Registrace uživatele
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await userDao.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ code: "emailExists", message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await userDao.create({ name, email, password: hashedPassword });

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(400).json({ code: err.code || "failedToCreateUser", message: err.message });
    }
  }

  // Přihlášení uživatele
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userDao.getByEmail(email);
      if (!user) {
        return res.status(404).json({ code: "userNotFound", message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ code: "invalidPassword", message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24, // 1 den
      });

      res.status(200).json({ user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
      res.status(400).json({ code: err.code || "failedToLogin", message: err.message });
    }
  }

  // Získání uživatelského profilu
  static async getUserProfile(req, res) {
    try {
      const user = await userDao.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ code: "userNotFound", message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ code: err.code || "failedToFetchUser", message: err.message });
    }
  }
}

// Registrace rout přímo zde
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", authMiddleware, AuthController.getUserProfile);

// Google OAuth routy
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 den
    });

    res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
  }
);

module.exports = router;
