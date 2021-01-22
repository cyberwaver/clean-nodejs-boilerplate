const express = require("express");
const cors = require("cors");
const enforce = require("express-sslify");

class Server {
  constructor({
    config,
    router,
    logger,
    userGraph,
    authTokenSerializerMiddleware,
    isAuthenticatedMiddleware,
  }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
    if (this.express.get("env") === "production") {
      this.express.use(enforce.HTTPS({ trustProtoHeader: true }));
    }
    this.express.disable("x-powered-by");
    this.express.use(cors());
    this.express.use("/graph/user", authTokenSerializerMiddleware("USER"));
    // this.express.use("/graph", isAuthenticatedMiddleware());
    userGraph({ app: this.express, path: "/graph/user" });
    // this.express.use("/adminGraph", adminGraph);
    this.express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express.listen(this.config.web.PORT, () => {
        const { port } = http.address();
        console.log("PORT IS: ", this.config.web.PORT);
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
