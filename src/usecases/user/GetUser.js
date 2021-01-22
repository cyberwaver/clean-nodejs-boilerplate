class GetUser {
  constructor({ usersRepository }) {
    this.usersRepo = usersRepository;
  }

  async execute(userId) {
    return await this.usersRepo.getById(userId);
  }
}

module.exports = GetUser;
