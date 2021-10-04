import Joi from "joi";

// login schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .max(40)
    .required()
    .label("EMAIL"),
  password: Joi.string().min(2).max(40).required().label("PASSWORD"),
});

// email shema
const emailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .max(40)
    .required()
    .label("EMAIL"),
});

// register shema
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .max(40)
    .required()
    .label("EMAIL"),
  firstname: Joi.string()
    .regex(new RegExp("^[a-zA-X]"))
    .min(2)
    .max(40)
    .required()
    .label("FIRST NAME"),
  lastname: Joi.string()
    .regex(new RegExp("^[a-zA-X]"))
    .min(2)
    .max(40)
    .required()
    .label("LAST NAME"),
  password: Joi.string().min(6).max(40).required().label("PASSWORD"),
});

// reset password schema
const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).max(50).required().label("PASSWORD"),
  passwordConfirm: Joi.ref("password"),
});

// post schema
const postSchema = Joi.object({
  content: Joi.string().required(),
  replyTo: Joi.string(),
});

export {
  loginSchema,
  emailSchema,
  registerSchema,
  resetPasswordSchema,
  postSchema,
};
