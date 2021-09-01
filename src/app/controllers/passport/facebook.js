import passport from "passport";
import passportFacebook from "passport-facebook";
import { transEmail, transErrors, tranSuccess } from "../../../../lang/vi";
import User from "../../models/User";

const FacebookStrategy = passportFacebook.Strategy;
const fbAppId = process.env.FB_APP_ID;
const fbAppSecret = process.env.FB_APP_SECRET;
const fbCallbackURL = process.env.FB_CALLBACK_URL;

const initPassportFacebook = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbCallbackURL,
        profileFields: ["email", "gender", "name", "displayName"],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findByFacebookUid(profile.id);
          if (user) {
            return done(
              null,
              user,
              req.flash("success", tranSuccess.login_success(user.displayname))
            );
          }
          let newUserItem = {
            displayname: profile.displayName,
            firstname: profile._json.first_name,
            lastname: profile._json.last_name,
            gender: profile.gender,
            local: { isActive: true },
            facebook: {
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

  // Save user id to session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  // Save req.user
  passport.deserializeUser((id, done) => {
    User.findByUserId(id)
      .then(user => done(null, user))
      .catch(error => done(error, null));
  });
};
export default initPassportFacebook;
