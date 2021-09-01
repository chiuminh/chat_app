import passport from "passport";
import passportLocal from "passport-local";
import { transErrors, tranSuccess } from "../../../../lang/vi";
import User from "../../models/User";
let LocalStrategy = passportLocal.Strategy;

const initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          let user = await User.findByEmail(email);
          if (!user) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.login_failed)
            );
          }

          if (user.deletedAt) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.account_removed)
            );
          }

          if (!user.local.isActive) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.account_not_active)
            );
          }
          let isValidPasswd = user.comparePassword(password);
          if (!isValidPasswd) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.login_failed)
            );
          }
          return done(
            null,
            user,
            req.flash("success", tranSuccess.login_success(user.displayname))
          );
        } catch (error) {
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

export default initPassportLocal;
