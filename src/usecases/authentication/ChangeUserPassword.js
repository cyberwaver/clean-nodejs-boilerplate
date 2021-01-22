const { USER_PASSWORD_CHANGED } = require("../../event/events");
const checkRule = require("../../utils/checkRule");
const { SuppliedPasswordShouldMatchAccountPassword } = require("./rules/authentication.rules");

class ChangeUserPassword {
  constructor({ userValidator, tokenService, usersRepository, encryptionService, eventPublisher }) {
    this.userValidator = userValidator;
    this.tokenService = tokenService;
    this.usersRepo = usersRepository;
    this.encryptionService = encryptionService;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData, userId) {
    const data = await this.userValidator.validateChangeUserPasswordData(requestData);
    const user = await this.usersRepo.getById(userId);
    await checkRule(SuppliedPasswordShouldMatchAccountPassword(data.password, user, this.encryptionService));
    const hashedPassword = await this.encryptionService.encryptPassword(data.newPassword);
    const updatedUser = await this.usersRepo.updateById(user.id, { password: hashedPassword });
    this.eventPublisher.publish(USER_PASSWORD_CHANGED, updatedUser);
  }
}

module.exports = ChangeUserPassword;
