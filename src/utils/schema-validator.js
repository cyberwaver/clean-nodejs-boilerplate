const { ValidationException, ApplicationException } = require("../exceptions/index");

const validateSchema = async (schema, data, name) => {
  if (!data) throw new ApplicationException(`data to validate is undefined for: ${name}`, "ValidateSchema");
  try {
    const a = await schema.validateAsync(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return a;
  } catch (err) {
    const errorObj = {};
    err.details.forEach(({ message, path }) => {
      let temp = errorObj;
      path.forEach((p, i) => {
        if (i !== path.length - 1) {
          if (typeof p === "string") {
            temp[p] = {};
            temp = temp[p];
          }
          if (typeof p === "number") {
            if (!Array.isArray(temp[p])) {
              temp = temp[path - (i - 1)] = [];
            }
            temp = temp[p] = {};
          }
        }
        temp[p] = message;
      });
    });
    throw new ValidationException(errorObj);
  }
};

module.exports = validateSchema;
