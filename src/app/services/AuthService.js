import sendMail from "../../config/mailer";
import User from "../models/User";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { transEmail, tranSuccess, transErrors } from "../../../lang/vi";
class AuthService {

  /**
   * Register account
   * @param {string} firstname 
   * @param {string} lastname 
   * @param {string} email 
   * @param {string} password 
   * @param {string} protocol 
   * @param {string} host 
   */
  register(firstname, lastname, email, password, protocol, host) {
    return new Promise(async (resolve, reject) => {
      // check email
      const user = await User.findByEmail(email);
      if (user) {
        // check deleted account
        if (user.deletedAt) {
          return reject(transErrors.account_in_use);
        }
        return reject(transErrors.account_in_use);
      }

      // encrypt password
      const salt = bcrypt.genSaltSync(8);
      const hashPassword = bcrypt.hashSync(password, salt);

      // create username from email
      let username = email.split("@")[0];

      // create new user item
      let item = {
        firstname,
        lastname,
        username,
        local: {
          password: hashPassword,
          verifyToken: v4(),
          email,
        },
      };
      try {
        // save user item to database
        let newUser = await User.createNew(item);
        let linkVerify = `${protocol}://${host}/verify/${newUser.local.verifyToken}`;

        // send link to email for verification
        await sendMail(
          newUser.local.email,
          transEmail.subject,
          transEmail.template(linkVerify)
        ).catch(async error => {
          // remove user
          console.log({ errorSendMail: error });
          await User.removeById(newUser._id);
          return reject(transEmail.send_failed);
        });

        resolve(tranSuccess.userCreated(newUser.local.email));
      } catch (error) {
        console.log({ errorAuthService: error });
        reject(transErrors.server_error);
      }
    });
  }

  /**
   * Check account verification
   * @param {string} token 
   */
  verifyAccount(token) {
    return new Promise(async (resolve, reject) => {
      // Find user with token
      let userByToken = await User.findByToken(token);
      if (userByToken) {
         // Remove token and active account
        await User.verifyToken(token);

        return resolve(tranSuccess.account_actived);
      }
      reject(transErrors.token_undefined);
    });
  }
}
export default new AuthService();
