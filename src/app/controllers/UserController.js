import validate, { emailSchema, registerSchema } from "../../validate";
import User from "../models/User";
import bcrypt from "bcrypt";
class UserController {
  async postRegister(req, res) {
    try {
      const { error } = validate(req.body, registerSchema);
      let playload = req.body;
      playload.errorMessages = {};

      if (error) {
        for (const err of error.details)
          playload.errorMessages[err.path[0]] = err.message;
        return res.render("auth/register", playload);
      }

      // check email exists or not
      const user = await User.findByEmail(req.body.email);
      if (user) {
        playload.errorMessages.email = "Email already in use.";
        return res.render("auth/register", playload);
      }
      const { firstname, lastname, email, password } = req.body;

      // encrypt password
      const salt = bcrypt.genSaltSync(8);
      const hashPassword = bcrypt.hashSync(password, salt);

      // create new user
      let item = {
        firstname,
        lastname,
        local: {
          email,
          password: hashPassword,
        },
      };
      await User.createNew(item);

      // send email

      // verify email

      res.redirect("/");
    } catch (error) {
      console.log({ error });
      res.sendStatus(500);
    }
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
    res.render("auth/register");
  }
  async getForgotPassword(req, res) {
    res.render("auth/forgot_password");
  }
}
export default new UserController();
