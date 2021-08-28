import { loginSchema, emailSchema, registerSchema } from "./schema";

const validate = (item, schema) => {
  return schema.validate(item, { abortEarly: false });
};

export { loginSchema, emailSchema, registerSchema };
export default validate;
