const Joi = require("joi");
const validateSchema = require("../utils/schema-validator");

class UserValidator {
  constructor() {}

  async validateChangeUserPasswordData(data) {
    return await validateSchema(changeUserPasswordSchema, data);
  }

  async validateUpdateUserData(data) {
    return await validateSchema(updateUserSchema, data);
  }

  async validateAddUserAvatarUpload(data) {
    return await validateSchema(newUserAvatarUpload, data);
  }
}

const newUserAvatarUpload = Joi.object({
  avatarUploadMeta: Joi.object().required(),
});

const changeUserPasswordSchema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  initial: Joi.string().min(1).max(30),
  firstName: Joi.string().min(1).max(30),
  lastName: Joi.string().min(1).max(30),
  rank: Joi.string().valid("LAWYER", "SAN", "BENCHER"),
  yearOfCall: Joi.number(),
  enrollmentNo: Joi.number().cast("string"),
  phone: Joi.number().cast("string"),
  gender: Joi.string(),
  address: Joi.string(),
  organization: Joi.string(),
});

module.exports = UserValidator;
