const {
  ACCOUNT_CREATED,
  ACCOUNT_PASSWORD_RESET_REQUESTED,
  ACCOUNT_EMAIL_VERIFICATION_REQUESTED,
  USER_PASSWORD_CHANGED,
} = require("../events");
const BaseListener = require("./BaseListener");

class EmailListener extends BaseListener {
  constructor({ emailService }) {
    super();
    this.emailService = emailService;
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.listenTo(ACCOUNT_CREATED, this.sendUserWelcomeEmail);
    this.listenTo(ACCOUNT_PASSWORD_RESET_REQUESTED, this.sendUserPasswordResetInstructionEmail);
    this.listenTo(ACCOUNT_EMAIL_VERIFICATION_REQUESTED, this.sendUserEmailVerificationEmail);
    this.listenTo(USER_PASSWORD_CHANGED, this.sendUserPasswordChangedEmail);
  }

  async sendUserWelcomeEmail({ data }) {
    await this.emailService.sendWelcomeEmail(data);
  }

  async sendUserPasswordResetInstructionEmail({ data }) {
    await this.emailService.sendUserPasswordResetInstructionEmail(data);
  }

  async sendUserEmailVerificationEmail({ data }) {
    await this.emailService.sendUserEmailVerificationEmail(data);
  }

  async sendPasswordResetSuccessfulEmail({ data }) {
    await this.emailService.sendPasswordResetSuccessfulEmail(data);
  }

  async sendUserPasswordChangedEmail({ data }) {
    await this.emailService.sendUserPasswordChangedEmail(data);
  }
}

module.exports = EmailListener;
