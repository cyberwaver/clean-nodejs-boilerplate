const { ACCOUNT_EMAIL_VERIFIED } = require("../../event/events");
const checkRule = require("../../utils/checkRule");
const { AccountEmailShouldNotHaveBeenVerified } = require("./rules/authentication.rules");

class VerifyUserEmail {
  constructor({ authenticationValidator, tokenService, usersRepository, eventPublisher }) {
    this.authValidator = authenticationValidator;
    this.tokenService = tokenService;
    this.usersRepo = usersRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData) {
    const data = await this.authValidator.validateVerifyUserEmailData(requestData);
    const { email } = await this.tokenService.decodeUserEmailVerificationToken(data.token);
    const errorMsg = "Email to be verified is not associated with an account";
    const user = await this.usersRepo.getByAttributes({ email }, errorMsg);
    await checkRule(AccountEmailShouldNotHaveBeenVerified(user));
    const updatedUser = await this.usersRepo.updateByAttributes({ email }, { isEmailVerified: true });
    this.eventPublisher.publish(ACCOUNT_EMAIL_VERIFIED, updatedUser);
  }
}

module.exports = VerifyUserEmail;
