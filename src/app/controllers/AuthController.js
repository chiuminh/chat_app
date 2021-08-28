import validate, { loginSchema } from "../../validate";
class AuthController {
  async getLogin(req, res) {
    res.render("auth/login");
  }
  async postLogin(req, res) {
    const { error } = validate(req.body, loginSchema);
    if (error) {
      let playload = req.body;
      playload.errorMessages = {};

      for (const err of error.details)
        playload.errorMessages[err.path[0]] = err.message;

      return res.render("auth/login", playload);
    }
    res.redirect("/");
  }
}
export default new AuthController();
