class GetUsers {
  constructor({ usersRepository }) {
    this.usersRepo = usersRepository;
  }

  async execute() {
    return await this.usersRepo.getAll();
  }
}

module.exports = GetUsers;
