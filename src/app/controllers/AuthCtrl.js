import { tranSuccess } from "../../../lang/vi";
import AuthService from "../services/AuthService";
import { validate, registerSchema } from "../../validate";

class AuthCtrl {
  // [POST] /register
  async postRegister(req, res) {
    // Validate data from clients
    const { value, error } = validate(req.body, registerSchema);
    if (error) {
      let payload = req.body;
      payload.errorMessages = {};

      for (const err of error.details)
        payload.errorMessages[err.path[0]] = err.message;

      // render register page and messsages error
      return res.render("auth/register", {
        ...payload,
        success: req.flash("success"),
        errors: req.flash("errors"),
      });
    }

    try {
      const { firstname, lastname, email, password } = req.body;
      let host = req.get("host");
      const protocol = req.protocol;

      // Register account
      const message = await AuthService.register(
        firstname,
        lastname,
        email,
        password,
        protocol,
        host
      );
      req.flash("success", message);
      res.redirect("/login");
    } catch (error) {
      req.flash("errors", error);
      return res.redirect("/register");
    }
  }

  // [GET] /logout
  async logout(req, res) {
    req.logout(); // remove passport on session

    req.flash("success", tranSuccess.logout_success);
    res.redirect("/login");
  }

  // [GET] /verify/:token
  async verifyToken(req, res) {
    try {
      // check account verification
      let verifySuccess = await AuthService.verifyAccount(req.params.token);
      req.flash("success", verifySuccess);
      res.redirect("/login");
    } catch (error) {
      req.flash("errors", error);
      res.redirect("/login");
    }
  }

  // [GET] /login
  async getLoginPage(req, res) {
    res.render("auth/login", {
      errors: req.flash("errors"),
      success: req.flash("success"),
    });
  }
  // [GET] /register
  async getRegister(req, res) {
    res.render("auth/register", {
      success: req.flash("success"),
      errors: req.flash("errors"),
    });
  }
}
export default new AuthCtrl();

