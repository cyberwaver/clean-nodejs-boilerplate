const EmailShouldNotBeAssociatedWithAnAccount = require("./EmailShouldNotBeAssociatedWithAnAccount");
const EmailShouldBeAssociatedWithAnAccount = require("./EmailShouldBeAssociatedWithAnAccount");
const SuppliedPasswordShouldMatchAccountPassword = require("./SuppliedPasswordShouldMatchAccountPassword");
const PasswordResetTokenMustBeWithinActivePeriod = require("./PasswordResetTokenMustBeWithinActivePeriod");
const AccountEmailShouldNotHaveBeenVerified = require("./AccountEmailShouldNotHaveBeenVerified");

module.exports = {
  EmailShouldNotBeAssociatedWithAnAccount,
  EmailShouldBeAssociatedWithAnAccount,
  SuppliedPasswordShouldMatchAccountPassword,
  PasswordResetTokenMustBeWithinActivePeriod,
  AccountEmailShouldNotHaveBeenVerified,
};
