import router, { use, post, get } from "../../routes/auth-new";
import { sign } from "jsonwebtoken";
import { use as _use, initialize, authenticate } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getByEmail, create } from "../../dao/user-dao";
import User from "../../models/User";
import Abl from "../../abl/auth-abl";

const abl = new Abl();

_use(
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
        let user = await getByEmail(email);

        if (!user) {
          // Pokud uživatel neexistuje, vytoř nového
          user = new User({
            name,
            email,
            google_id: profile.id,
          });
          await create(user);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

use(initialize());

post("/register", (req, res) => {
  abl.register(req, res);
});

post("/login", (req, res) => {
  abl.login(req, res);
});

get("/google", authenticate("google", { scope: ["profile", "email"] }));

get(
  "/google/callback",
  authenticate("google", { session: false }),
  (req, res) => {
    const token = sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      token,
      user: { id: req.user._id, email: req.user.email, role: req.user.role },
    });
  }
);

export default router;
