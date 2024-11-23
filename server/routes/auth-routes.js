const express = require("express");
const AuthController = require("../api/controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");
const passport = require("passport");

const router = express.Router();

// Registrace a přihlášení
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", authMiddleware, AuthController.getUserProfile);

// Přihlášení přes Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generování JWT tokenu
    const token = require("jsonwebtoken").sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Nastavení tokenu jako cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 den
    });

    // Přesměrování na frontend po úspěšném přihlášení
    res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
  }
);

module.exports = router;
