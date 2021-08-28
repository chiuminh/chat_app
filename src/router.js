import { Router } from "express";
const router = new Router();

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import HomeController from "./app/controllers/HomeController";
import Middleware from "./Middleware";

router
  .route("/login")
  .get(AuthController.getLogin)
  .post(AuthController.postLogin);

router
  .route("/forgot-password")
  .get(UserController.getForgotPassword)
  .post(UserController.postForgotPassword);

router
  .route("/register")
  .get(UserController.getRegister)
  .post(UserController.postRegister);

router.get("/", Middleware.requireLogin, HomeController.getHome);

export default router;
