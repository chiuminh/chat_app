class HomeController {
  getHome(req, res) {
    res.send("home page");
  }
}
export default new HomeController();
