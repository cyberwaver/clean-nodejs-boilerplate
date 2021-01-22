const { ApplicationException } = require("../../../exceptions");

const SuppliedPasswordShouldMatchUserPassword = (password, user, encryptionService, customMsg) => {
  const details = customMsg || "Supplied password do not match user account password";
  return {
    error: new ApplicationException(details, "SuppliedPasswordShouldMatchUserPassword"),
    isBroken: async () => (await encryptionService.comparePassword(password, user.password)) === false,
  };
};

module.exports = SuppliedPasswordShouldMatchUserPassword;
