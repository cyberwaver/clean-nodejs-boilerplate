const BaseRepo = require("./BaseRepo");
const UserModel = require("../../database/objectionORM/models/UserModel");

class UsersRepository extends BaseRepo {
  constructor() {
    super(UserModel, { singularName: "user", pluralName: "users" });
  }

  async getVerifiedUsersForEmails(emails = [], attrs = ["id"]) {
    const modelInstance = await this.Model.query()
      .select(...attrs)
      .whereIn("email", emails)
      .whereNotDeleted();
    return this.modelToJSON(modelInstance);
  }
}

module.exports = UsersRepository;
