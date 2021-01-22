const BaseListener = require("./BaseListener");

class UserListener extends BaseListener {
  constructor({}) {
    super();
    this.setupSubscriptions();
  }

  setupSubscriptions() {}
}

module.exports = UserListener;
