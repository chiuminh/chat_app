import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { transErrors, tranSuccess } from "../../../../lang/vi";
import User from "../../models/User";
const GoogleStrategy = passportGoogle.Strategy;

let ggAppId = process.env.GG_APP_ID;
let ggAppSecret = process.env.GG_APP_SECRET;
let ggAppCallback = process.env.GG_CALLBACK_URL;

function initPassportGoogle() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: ggAppId,
        clientSecret: ggAppSecret,
        callbackURL: ggAppCallback,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findByGoogleUid(profile.id);
          if (user) {
            return done(
              null,
              user,
              req.flash("success", tranSuccess.login_success(user.displayname))
            );
          }
          let newUserItem = {
            displayname: profile.displayName,
            firstname: profile.name.familyName,
            lastname: profile.name.givenName,
            local: { isActive: true },
            google: {
              uid: profile.id,
              token: accessToken,
              email: profile.emails[0].value,
            },
          };

          const newUser = await User.createNew(newUserItem);
          return done(
            null,
            newUser,
            req.flash("success", tranSuccess.login_success(newUser.displayname))
          );
        } catch (error) {
          console.log({ error });
          return done(
            null,
            false,
            req.flash("errors", transErrors.server_error)
          );
        }
      }
    )
  );
}
export default initPassportGoogle;
