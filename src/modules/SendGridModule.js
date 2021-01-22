const sgMail = require("@sendgrid/mail");

class SendGridModule {
  constructor({ config }) {
    const { API_KEY = "" } = config.external.sendgrid;
    sgMail.setApiKey(API_KEY);
  }

  async send(data) {
    await sgMail.send(data);
  }
}

module.exports = SendGridModule;
