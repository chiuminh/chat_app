import mailer from "../../config/mailer";
import User from "../models/User";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { transEmail, tranSuccess, transErrors } from "../../../lang/vi";
class AuthService {
  register(firstname, lastname, email, password, protocol, host) {
    return new Promise(async (resolve, reject) => {
      // check email exists or not
      const user = await User.findByEmail(email);
      if (user) {
        if (user.deletedAt) {
          return reject(transErrors.account_in_use);
        }
        return reject(transErrors.account_in_use);
      }

      // encrypt password
      const salt = bcrypt.genSaltSync(8);
      const hashPassword = bcrypt.hashSync(password, salt);

      let displayname = firstname + " " + lastname;
      // create new user
      let item = {
        displayname,
        firstname,
        lastname,
        local: {
          password: hashPassword,
          verifyToken: v4(),
          email,
        },
      };
      try {
        let newUser = await User.createNew(item);
        let linkVerify = `${protocol}://${host}/verify/${newUser.local.verifyToken}`;

        await mailer(
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

  verifyAccount(token) {
    return new Promise(async (resolve, reject) => {
      let userByToken = await User.findByToken(token);
      if (userByToken) {
        await User.verifyToken(token);
        return resolve(tranSuccess.account_actived);
      }
      reject(transErrors.account_undefined);
    });
  }
}
export default new AuthService();
