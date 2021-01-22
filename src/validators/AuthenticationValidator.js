const Joi = require("joi");
const validateSchema = require("../utils/schema-validator");

class AuthenticationValidator {
  async validateNewUserData(data) {
    return await validateSchema(newUserSchema, data);
  }

  async validateGenerateUserAuthTokenData(data) {
    return await validateSchema(generateUserAuthTokenSchema, data);
  }

  async validateRequestUserPasswordResetData(data) {
    return await validateSchema(emailSchema, data);
  }

  async validateRequestUserEmailVerificationData(data) {
    return await validateSchema(emailSchema, data);
  }

  async validateResetUserPasswordData(data) {
    return await validateSchema(resetUserPasswordSchema, data);
  }
  async validateVerifyUserEmailData(data) {
    return await validateSchema(verifyUserEmailSchema, data);
  }
}

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const generateUserAuthTokenSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const resetUserPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required(),
});

const verifyUserEmailSchema = Joi.object({
  token: Joi.string().required(),
});

const newUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
  phone: Joi.number().cast("string").required(),
  gender: Joi.string().required(),
});

module.exports = AuthenticationValidator;
