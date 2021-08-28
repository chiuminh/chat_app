import Joi from "joi";
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .max(40)
    .required()
    .label("EMAIL"),
  password: Joi.string().min(2).max(40).required().label("PASSWORD"),
});
const emailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .max(40)
    .required()
    .label("EMAIL"),
});
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

export { loginSchema, emailSchema, registerSchema };
