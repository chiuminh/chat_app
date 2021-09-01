import nodemailer from "nodemailer";

const adminUser = process.env.MAIL_USER;
const adminPass = process.env.MAIL_PASSWORD;
const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;

const mailer = (to, subject, htmlContent) => {
  let transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // use SSL - TLS
    auth: {
      user: adminUser,
      pass: adminPass,
    },
  });
  let mailOptions = {
    from: adminUser,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions);
};

export default mailer;
