import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userDao from "../dao/user-dao.js";
import { env } from "../utils/env.mjs";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name } = profile._json || {};

        // Ověřte, že všechny požadované údaje jsou k dispozici
        if (!email) {
          throw new Error("Email not found in Google profile.");
        }
        if (!name) {
          throw new Error("Name not found in Google profile.");
        }
        if (!profile.id) {
          throw new Error("Google ID is missing in profile.");
        }

        let user = await userDao.getByEmail(email);
        if (!user) {
          user = { name, email, google_id: profile.id };
          await userDao.create(user);
          console.log("New user created:", user);
        } else {
          console.log("User found in database:", user);
        }

        done(null, user);
      } catch (err) {
        console.error("Error in Google Strategy:", err);
        done(err, null);
      }
    }
  )
);

export default passport;
