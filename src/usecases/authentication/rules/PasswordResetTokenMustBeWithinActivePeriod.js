const { isAfter } = require("date-fns");
const { ApplicationException } = require("../../../exceptions");

const PasswordResetTokenMustBeWithinActivePeriod = (user, tokenIssuedDate) => {
  const details = `Invalid token, request for a new password reset token`;
  return {
    error: new ApplicationException(details, "PasswordResetTokenMustBeWithinActivePeriod"),
    isBroken: () => isAfter(new Date(user.passwordLastResetAt), new Date(tokenIssuedDate * 1000)),
  };
};

module.exports = PasswordResetTokenMustBeWithinActivePeriod;
