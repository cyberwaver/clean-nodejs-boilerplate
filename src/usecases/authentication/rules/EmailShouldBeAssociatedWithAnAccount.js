const { ApplicationException } = require("../../../exceptions");

const EmailShouldBeAssociatedWithAnAccount = (email, usersRepo) => {
  const details = `Email: ${email} is not associated with an account`;
  return {
    error: new ApplicationException(details, "EmailShouldBeAssociatedWithAnAccount"),
    isBroken: async () => (await usersRepo.recordExistsForAttributes({ email })) === false,
  };
};

module.exports = EmailShouldBeAssociatedWithAnAccount;
