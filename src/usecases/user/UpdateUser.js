const { USER_UPDATED } = require("../../event/events");

class UpdateUser {
  constructor({ userValidator, usersRepository, eventPublisher }) {
    this.userValidator = userValidator;
    this.usersRepo = usersRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData, userId) {
    const data = await this.userValidator.validateUpdateUserData(requestData);
    await this.usersRepo.getById(userId);
    const updatedUser = await this.usersRepo.updateById(userId, data);
    this.eventPublisher.publish(USER_UPDATED, updatedUser);
    return updatedUser;
  }
}

module.exports = UpdateUser;
