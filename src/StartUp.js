import express from "express";
import path from "path";

class StartUp {
  constructor(app) {
    this.app = app;
    this.initViewEngine();
    this.initMiddleware();
  }
  initViewEngine() {
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");
  }
  initMiddleware() {
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
}
export default StartUp;
