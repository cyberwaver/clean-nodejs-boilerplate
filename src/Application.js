class Application {
  constructor({ server, logger, registerListeners }) {
    this.server = server;
    this.logger = logger;
    this.registerListeners = registerListeners;
  }

  async start() {
    this.registerListeners();
    await this.server.start();
  }
}

module.exports = Application;
