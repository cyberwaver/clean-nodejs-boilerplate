const BaseModel = require("./BaseModel");

class UserModel extends BaseModel {
  static tableName = "users";

  static get jsonAttributes() {
    return [];
  }

  static get relationMappings() {}
}

module.exports = UserModel;
