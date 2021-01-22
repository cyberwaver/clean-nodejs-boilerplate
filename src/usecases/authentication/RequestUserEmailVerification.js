const { ACCOUNT_EMAIL_VERIFICATION_REQUESTED } = require("../../event/events");

class RequestUserEmailVerification {
  constructor({ authenticationValidator, tokenService, usersRepository, eventPublisher }) {
    this.authValidator = authenticationValidator;
    this.tokenService = tokenService;
    this.usersRepo = usersRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData) {
    const data = await this.authValidator.validateRequestUserEmailVerificationData(requestData);
    const errorMsg = `Email: ${data.email} is not associated with an account`;
    const user = await this.usersRepo.getByAttributes({ email: data.email }, errorMsg);
    const token = await this.tokenService.generateUserEmailVerificationToken({ email: data.email });
    this.eventPublisher.publish(ACCOUNT_EMAIL_VERIFICATION_REQUESTED, { user, token });
  }
}

module.exports = RequestUserEmailVerification;
