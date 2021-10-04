// req.isAuthenticated: will return true if user is logged in
const requireLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
    return next();
  }
  return res.redirect("/login");
};
const requireLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};
export { requireLoggedIn, requireLoggedOut };
