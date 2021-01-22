const nodemailer = require("nodemailer");

class NodemailerModule {
  constructor({ config }) {
    const { HOST, PORT, SECURE, auth = {} } = config.nodemailer || {};
    this.transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: SECURE,
      auth: {
        user: auth.USER,
        pass: auth.PASSWORD,
      },
    });
  }

  async send(mailData) {
    return await this.transporter.sendMail(mailData);
  }
}

module.exports = NodemailerModule;
