import UserService from "../services/UserService";
import { validate, emailSchema, resetPasswordSchema } from "../../validate";

class UserCtrl {
  
  // [POST] /forgot-password
  async postForgotPassword(req, res) {
    // Validate data from client
    const { error } = validate({ email: req.body.email }, emailSchema);
    if (error) {
      let errorMessages = {
        email: error.details[0].message,
      };
      return res.render("auth/forgot_password", {
        errorMessages,
        success: req.flash("success"),
        errors: req.flash("errors"),
      });
    }

    try {
      let message = await UserService.postForgotPassword(
        req.body.email,
        req.protocol,
        req.get("host")
      );
      req.flash("success", message);
      res.redirect("/forgot-password");
    } catch (error) {
      req.flash("errors", error);
      res.redirect("/forgot-password");
    }
  }

  // [GET] /forgot-password
  async getForgotPasswordPage(req, res) {
    res.render("auth/forgot_password", {
      success: req.flash("success"),
      errors: req.flash("errors"),
    });
  }

  // [GET] /reset-password/:id/:token
  async getResetPasswordPage(req, res, next) {
    const { id, token } = req.params;
    try {
      // check id and token of user-submitted
      let payload = await UserService.checkTokenAndId(id, token);
      res.render("auth/reset_password", {
        success: req.flash("success"),
        errors: req.flash("errors"),
        payload,
      });
    } catch (error) {
      console.log({ error });
      req.flash("errors", error);
      return res.redirect("/forgot-password");
    }
  }

  // [POST] /reset-password/:id/:token
  async resetPassword(req, res, next) {
    const { id, token } = req.params;
    const { password, passwordConfirm } = req.body;

    try {
      // Check id and token of user when send password reset
      let payload = await UserService.checkTokenAndId(id, token);

      // Revoking JWTs: Chưa xử lý được

      // validate password
      const { error } = validate(
        { password, passwordConfirm },
        resetPasswordSchema
      );
      if (error) {
        req.flash("errors", error.details[0].message);
        return res.redirect(`/reset-password/${id}/${token}`);
      }
      // Update password
      await UserService.updatePassword(payload.id, password);
      return res.redirect(`/login`);
    } catch (error) {
      console.log({ error });
      req.flash("errors", error);
      return res.redirect("/forgot-password");
    }
  }
}
export default new UserCtrl();
