const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userDao = require("../dao/user-dao");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name } = profile._json;
        let user = await userDao.getByEmail(email);

        if (!user) {
          user = { name, email, google_id: profile.id };
          await userDao.create(user);
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
