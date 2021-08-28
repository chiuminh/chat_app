class Middleware {
  requireLogin(req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    next();
  }
}

export default new Middleware();
