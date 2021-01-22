const checkRule = require("../../utils/checkRule");
const { SuppliedPasswordShouldMatchAccountPassword } = require("./rules/authentication.rules");

class GenerateUserAuthToken {
  constructor({ authenticationValidator, tokenService, encryptionService, usersRepository, eventPublisher }) {
    this.authValidator = authenticationValidator;
    this.tokenService = tokenService;
    this.encryptionService = encryptionService;
    this.usersRepo = usersRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData) {
    const { email, password } = await this.authValidator.validateGenerateUserAuthTokenData(requestData);
    const MSG = "Incorrect email address or password";
    const user = await this.usersRepo.getByAttributes({ email }, MSG);
    await checkRule(SuppliedPasswordShouldMatchAccountPassword(password, user, this.encryptionService, MSG));
    return await this.tokenService.generateUserAuthToken({ id: user.id });
  }
}

module.exports = GenerateUserAuthToken;
