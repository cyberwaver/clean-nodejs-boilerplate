const { ACCOUNT_CREATED } = require("../../event/events");
const checkRule = require("../../utils/checkRule");
const { EmailShouldNotBeAssociatedWithAnAccount } = require("./rules/authentication.rules");

class SignupUser {
  constructor({ authenticationValidator, encryptionService, usersRepository, eventPublisher }) {
    this.authValidator = authenticationValidator;
    this.encryptionService = encryptionService;
    this.usersRepo = usersRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData) {
    const data = await this.authValidator.validateNewUserData(requestData);
    await checkRule(EmailShouldNotBeAssociatedWithAnAccount(data.email, this.usersRepo));
    data.password = await this.encryptionService.encryptPassword(data.password);
    const user = await this.usersRepo.add(data);
    this.eventPublisher.publish(ACCOUNT_CREATED, user);
    return user;
  }
}

module.exports = SignupUser;
