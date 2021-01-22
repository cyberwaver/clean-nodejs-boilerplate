const bcrypt = require("bcryptjs");

class EncryptionService {
  constructor() {}

  async encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  }

  async comparePassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
  }
}

module.exports = EncryptionService;
