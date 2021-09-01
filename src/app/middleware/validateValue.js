import validate, { loginSchema, registerSchema } from "../../validate";

const isValidValueLogin = (req, res, next) => {
  const { error } = validate(req.body, loginSchema);
  if (error) {
    let payload = req.body;
    payload.errorMessages = {};
    for (const err of error.details)
      payload.errorMessages[err.path[0]] = err.message;
    return res.render("auth/login", {
      ...payload,
      success: req.flash("success"),
      errors: req.flash("errors"),
    });
  }
  next();
};

const isValidValueRegister = (req, res, next) => {
  const { error } = validate(req.body, registerSchema);
  if (error) {
    let payload = req.body;
    payload.errorMessages = {};
    for (const err of error.details)
      payload.errorMessages[err.path[0]] = err.message;
    return res.render("auth/register", {
      ...payload,
      success: req.flash("success"),
      errors: req.flash("errors"),
    });
  }
  next();
};

export { isValidValueLogin, isValidValueRegister };
