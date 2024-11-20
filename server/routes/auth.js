const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const router = express.Router();

// Google OAuth2 Strategie

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, name } = profile._json;

      try {
        // Zkontroluj, jestli uživatel existuje
        let user = await User.findOne({ email });

        if (!user) {
          // Pokud uživatel neexistuje, vytoř nového
          user = new User({
            name,
            email,
            google_id: profile.id,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


router.use(passport.initialize());


// Registrace uživatele

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Zkontroluj, jestli uživatel existuje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email už existuje" });
    }

    // Hashování hesla
    const hashedPassword = await bcrypt.hash(password, 12);

    // Uložení uživatele do databáze
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Uživatel vytvořen" });
  } catch (err) {
    res.status(500).json({ message: "Chyba serveru" });
  }
});


// Přihlášení uživatele

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Najdi uživatele podle emailu
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Uživatel nenalezen" });
    }

    // Ověření hesla
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Nesprávné heslo" });
    }

    // Vytvoření JWT tokenu
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Chyba serveru" });
  }
});


// Přihlášení přes Google

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

    res.status(200).json({ token, user: { id: req.user._id, email: req.user.email, role: req.user.role } });
  }
);

module.exports = router;
