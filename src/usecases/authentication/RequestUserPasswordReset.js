const { ACCOUNT_PASSWORD_RESET_REQUESTED } = require("../../event/events");

class RequestUserPasswordReset {
  constructor({ authenticationValidator, tokenService, usersRepository, eventPublisher }) {
    this.authValidator = authenticationValidator;
    this.tokenService = tokenService;
    this.usersRepo = usersRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData) {
    const data = await this.authValidator.validateRequestUserPasswordResetData(requestData);
    const errorMsg = `Email: ${data.email} is not associated with an account`;
    const user = await this.usersRepo.getByAttributes({ email: data.email }, errorMsg);
    const token = await this.tokenService.generateUserPasswordResetToken({ email: data.email });
    this.eventPublisher.publish(ACCOUNT_PASSWORD_RESET_REQUESTED, { user, token });
  }
}

module.exports = RequestUserPasswordReset;
