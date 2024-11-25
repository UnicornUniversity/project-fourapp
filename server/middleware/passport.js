import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userDao from '../dao/user-dao.js';

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

export default passport;
