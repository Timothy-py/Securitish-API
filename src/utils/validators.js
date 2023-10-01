const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
    ),
});

const createSafeboxSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
    ),
});

const addContentSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

const validateUserSignup = validator(signupSchema);
const validateCreateSafebox = validator(createSafeboxSchema);
const validateAddContent = validator(addContentSchema);

module.exports = {
  validateUserSignup,
  validateCreateSafebox,
  validateAddContent,
};
