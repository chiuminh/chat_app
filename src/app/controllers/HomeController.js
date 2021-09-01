class HomeController {
  getHome(req, res) {
    res.render("main/master", {
      success: req.flash("success"),
      errors: req.flash("errors"),
    });
  }
}
export default new HomeController();
