const { ApplicationException } = require("../../../exceptions");

const EmailShouldNotBeAssociatedWithAnAccount = (email, usersRepo) => {
  const details = `Email: ${email} is associated with an account`;
  return {
    error: new ApplicationException(details, "EmailShouldNotBeAssociatedWithAnAccount"),
    isBroken: async () => (await usersRepo.recordExistForAttributes({ email })) === true,
  };
};

module.exports = EmailShouldNotBeAssociatedWithAnAccount;
