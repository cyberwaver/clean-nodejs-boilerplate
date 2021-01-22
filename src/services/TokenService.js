const jwt = require("jsonwebtoken");
const { ApplicationException } = require("../exceptions");

class TokenService {
  constructor({ config }) {
    this.TOKEN_SECRET = config.TOKEN_SECRET;
  }

  async generateUserPasswordResetToken(data) {
    return await this._generateToken(data, "PASSWORD_RESET", "USER");
  }

  async generateUserEmailVerificationToken(data) {
    return await this._generateToken(data, "EMAIL_VERIFICATION", "USER");
  }

  async generateUserAuthToken(data) {
    return await this._generateToken(data, "AUTH", "USER");
  }

  async decodeUserPasswordResetToken(token) {
    return await this._decodeToken(token, "PASSWORD_RESET", "USER");
  }

  async decodeUserEmailVerificationToken(token) {
    return await this._decodeToken(token, "EMAIL_VERIFICATION", "USER");
  }

  async decodeUserAuthToken(token) {
    return await this._decodeToken(token, "AUTH", "USER");
  }

  async generateCustomTypeToken(data, opts) {
    return jwt.sign(data, this.TOKEN_SECRET, opts);
  }

  async _generateToken(data, subject, audience) {
    return jwt.sign(data, this.TOKEN_SECRET, { expiresIn: "24h", subject, audience });
  }

  async _decodeToken(token, subject, audience) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.TOKEN_SECRET, { subject, audience }, (err, decoded) => {
        if (!err) return resolve(decoded);
        return reject(new ApplicationException("Token has expired or its invalid", "TokenInvalidOrExpired"));
      });
    });
  }
}

module.exports = TokenService;
