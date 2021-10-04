import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import sendMail from "../../config/mailer";
import { transEmail, transErrors, tranSuccess } from "../../../lang/vi";
class UserService {

  /**
   * 
   * @param {*} email 
   * @param {*} protocol 
   * @param {*} host 
   * @returns 
   */
  postForgotPassword(email, protocol, host) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          return reject(transErrors.account_undefined);
        }
        if (user.deletedAt) {
          return reject(transErrors.account_removed);
        }
        if (!user.local.isActive) {
          return reject(transErrors.account_not_active);
        }

        let token = jwt.sign(
          {
            id: user._id,
            email: user.local.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "10m",
          }
        );
        let linkResetPasswd = `${protocol}://${host}/reset-password/${user._id}/${token}`;
        await sendMail(
          email,
          transEmail.subjectResetPasswd,
          transEmail.templateResetPasswd(linkResetPasswd)
        ).catch(error => {
          console.log({ sendMailResetPassword: error });
          return reject(transEmail.send_failed);
        });
        resolve(tranSuccess.send_link_reset_passwd_success);
      } catch (error) {
        console.log({ postForgotPassword: error });
        reject(transErrors.server_error);
      }
    });
  }

  /**
   * 
   * @param {string} id 
   * @param string} password 
   */
  updatePassword(id, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findById(id);
        if (!user) {
          return reject(transErrors.account_undefined);
        }

        if (user.comparePassword(password))
          return reject(transErrors.passowrd_not_changed);

        // encrypt password
        const salt = bcrypt.genSaltSync(8);
        const hashPassword = bcrypt.hashSync(password, salt);

        let userUpdated = await User.findByUserIdAndUpdate(user._id, {
          "local.password": hashPassword,
        });
        console.log({ userUpdated });
        return resolve(tranSuccess.user_password_update);
      } catch (error) {
        console.log({ postForgotPassword: error });
        return reject(transErrors.server_error);
      }
    });
  }

  /**
   * Check id and token of user-submitted
   * @param {string} id 
   * @param {string} token 
   */
  checkTokenAndId(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findById(id);
        if (!user) {
          return reject(transErrors.account_undefined);
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return resolve(payload);
      } catch (error) {
        console.log({ postForgotPassword: error });
        return reject(transErrors.token_expired);
      }
    });
  }
}
export default new UserService();
