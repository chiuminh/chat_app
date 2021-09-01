import { transErrors, tranSuccess } from "../../../lang/vi";
import validate, {
  loginSchema,
  emailSchema,
  registerSchema,
} from "../../validate";
import AuthService from "../services/AuthService";

class AuthController {
  async postRegister(req, res) {
    try {
      const { firstname, lastname, email, password } = req.body;
      let host = req.get("host");
      const protocol = req.protocol;
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
  async getLogout(req, res) {
    req.logout(); // remove passport on session

    req.flash("success", tranSuccess.logout_success);
    res.redirect("/login");
  }
  async verifyToken(req, res) {
    try {
      let verifySuccess = await AuthService.verifyAccount(req.params.token);
      req.flash("success", verifySuccess);
      res.redirect("/login");
    } catch (error) {
      req.flash("errors", error);
      res.redirect("/login");
    }
  }

  async getLogin(req, res) {
    res.render("auth/login", {
      errors: req.flash("errors"),
      success: req.flash("success"),
    });
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

  async postForgotPassword(req, res) {
    const { error } = validate(req.body, emailSchema);
    if (error) {
      let playload = req.body;
      playload.errorMessages = {
        email: error.details[0].message,
      };
      return res.render("auth/forgot_password", playload);
    }
    res.redirect("/forgot_password");
  }
  async getRegister(req, res) {
    res.render("auth/register", {
      success: req.flash("success"),
      errors: req.flash("errors"),
    });
  }
  async getForgotPassword(req, res) {
    res.render("auth/forgot_password");
  }
}
export default new AuthController();
