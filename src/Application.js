class Application {
  constructor({ expressServer, logger, registerListeners }) {
    this.expressServer = expressServer;
    this.logger = logger;
    this.registerListeners = registerListeners;
  }

  async start() {
    this.registerListeners();
    await this.expressServer.start();
  }
}

module.exports = Application;
