import { Router } from "express";
const router = new Router();

import UserController from "../app/controllers/UserController";
import AuthController from "../app/controllers/AuthController";
import HomeController from "../app/controllers/HomeController";
import initPassportLocal from "../app/controllers/passport/local";
import * as middleware from "../app/middleware";
import passport from "passport";
import initPassportFacebook from "../app/controllers/passport/facebook";
import initPassportGoogle from "../app/controllers/passport/google";

// init all passport
initPassportLocal();
initPassportFacebook();
initPassportGoogle();

export default function (app) {
  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    }
  );

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"],
      successFlash: true,
      failureFlash: true,
    })
  );
  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  router
    .route("/login")
    .get(middleware.requireLoggedOut, AuthController.getLogin)
    .post(
      middleware.isValidValueLogin,
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true,
      })
    );
  router.get("/logout", AuthController.getLogout);
  router
    .route("/forgot-password")
    .get(middleware.requireLoggedOut, UserController.getForgotPassword)
    .post(UserController.postForgotPassword);

  router
    .route("/register")
    .get(middleware.requireLoggedOut, AuthController.getRegister)
    .post(middleware.isValidValueRegister, AuthController.postRegister);

  router.get("/verify/:token", AuthController.verifyToken);

  router.get("/", middleware.requireLoggedIn, HomeController.getHome);

  app.use("/", router);
}
