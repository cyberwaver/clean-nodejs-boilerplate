const path = require("path");
const _ = require("lodash");
const Email = require("email-templates");

const email = new Email({
  juice: true,
  juiceSettings: {
    tableElements: ["TABLE"],
  },
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.resolve("public/email"),
    },
  },
  views: {
    root: path.resolve("public/email"),
    options: {
      extension: "ejs",
    },
  },
});

const emailTypeHash = {
  WELCOME_EMAIL: ["Welcome to NBA Lagos Portal", "welcome"],
  PASSWORD_RESET_INSTRUCTION: ["Password Reset Requested", "password-reset"],
  PASSWORD_RESET_SUCCESSFUL: ["Password Reset", "password-reset-successful"],
  PASSWORD_CHANGED: ["Password Changed", "password-changed"],
  EMAIL_VERIFICATION: ["Email Verification Requested", "email-verification"]
};

class EmailService {
  constructor({ config, sendGridModule, nodemailerModule, tokenService, usersRepository }) {
    this.config = config;
    this.sendGridModule = sendGridModule;
    this.nodemailerModule = nodemailerModule;
    this.tokenService = tokenService;
    this.usersRepo = usersRepository;
  }

  async _pushEmail(type, to, data) {
    if (this.config.env === "development") return `Email sent to: ${to}`;
    const [subject, templatePath] = emailTypeHash[type] || [];
    if (!subject || !templatePath) return;
    const html = await email.render(`templates/${templatePath}`, data);
    const { FROM, NAME } = this.config.email.meta;
    try {
      await this.sendGridModule.send({ from: FROM, to, html, name: NAME, subject });
      console.log("SENT EMAIL TO: ", to);
    } catch (err) {
      throw err;
    }
  }

  async sendWelcomeEmail(userAccountData) {
    const { firstName, lastName, email } = userAccountData;
    const token = await this.tokenService.generateUserEmailVerificationToken({ email });
    const url = `${this.config.CLIENT_BASE_URL}/verify-email/${token}`;
    await this._pushEmail("WELCOME_EMAIL", email, { firstName, lastName, url });
  }

  async sendUserPasswordResetInstructionEmail(data) {
    const { user, token } = data;
    const { firstName, lastName, email } = user;
    const url = `${this.config.CLIENT_BASE_URL}/reset-password/${token}`;
    await this._pushEmail("PASSWORD_RESET_INSTRUCTION", email, { firstName, lastName, url });
  }

  async sendUserEmailVerificationEmail(data) {
    const { user, token } = data;
    const { firstName, lastName, email } = user;
    const url = `${this.config.CLIENT_BASE_URL}/verify-email/${token}`;
    await this._pushEmail("EMAIL_VERIFICATION", email, { firstName, lastName, url });
  }

  async sendPasswordResetSuccessfulEmail(data) {
    const { firstName, lastName, email } = data;
    await this._pushEmail("PASSWORD_RESET_SUCCESSFUL", email, { firstName, lastName });
  }

  async sendUserPasswordChangedEmail(data) {
    const { firstName, lastName, email } = data;
    await this._pushEmail("PASSWORD_CHANGED", email, { firstName, lastName });
  }
}

module.exports = EmailService;
