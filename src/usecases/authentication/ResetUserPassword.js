const { ACCOUNT_PASSWORD_RESET } = require("../../event/events");
const checkRule = require("../../utils/checkRule");
const { PasswordResetTokenMustBeWithinActivePeriod } = require("./rules/authentication.rules");

class ResetUserPassword {
  constructor({ authenticationValidator, encryptionService, tokenService, usersRepository, eventPublisher }) {
    this.authValidator = authenticationValidator;
    this.encryptionService = encryptionService;
    this.tokenService = tokenService;
    this.usersRepo = usersRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData) {
    const data = await this.authValidator.validateResetUserPasswordData(requestData);
    const { email, iat } = await this.tokenService.decodeUserPasswordResetToken(data.token);
    const user = await this.usersRepo.getByAttributes({ email });
    await checkRule(PasswordResetTokenMustBeWithinActivePeriod(user, iat));
    const hashedPassword = await this.encryptionService.encryptPassword(data.password);
    const updatedUser = await this.usersRepo.updateByAttributes({ email }, { password: hashedPassword });
    this.eventPublisher.publish(ACCOUNT_PASSWORD_RESET, updatedUser);
  }
}

module.exports = ResetUserPassword;
