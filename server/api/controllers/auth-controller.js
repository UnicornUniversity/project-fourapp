const router = require("../../routes/auth");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userDao = require("../../dao/user-dao")
const User = require("../../models/User")

const Abl = require("../../abl/auth-abl")

const abl = new Abl

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
          let user = await userDao.getByEmail(email)
  
          if (!user) {
            // Pokud uživatel neexistuje, vytoř nového
            user = new User({
              name,
              email,
              google_id: profile.id,
            });
            await userDao.create(user)
          }
  
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
  
  
  router.use(passport.initialize());

router.post("/register" , (req , res) =>{
  abl.register(req , res)
})

router.post("/login" , (req , res) =>{
  abl.login(req , res)
})

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
  
module.exports = router