const { isAfter } = require("date-fns");
const { ApplicationException } = require("../../../exceptions");

const AccountEmailShouldNotHaveBeenVerified = (account) => {
  const details = `Account email: ${account.email} has already been verified`;
  return {
    error: new ApplicationException(details, "AccountEmailShouldNotHaveBeenVerified"),
    isBroken: () => account.isEmailVerified === true,
  };
};

module.exports = AccountEmailShouldNotHaveBeenVerified;
