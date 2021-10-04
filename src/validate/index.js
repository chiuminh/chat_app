import {
  loginSchema,
  emailSchema,
  registerSchema,
  resetPasswordSchema,
  postSchema,
} from "./schema";

const validate = (item, schema) => {
  return schema.validate(item, { abortEarly: false });
};

export {
  validate,
  loginSchema,
  emailSchema,
  registerSchema,
  resetPasswordSchema,
  postSchema,
};
