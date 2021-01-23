const express = require("express");
const cors = require("cors");
const enforce = require("express-sslify");

class Server {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
  }

  load({ router, graph, authTokenSerializerMiddleware }) {
    if (this.express.get("env") === "production") {
      this.express.use(enforce.HTTPS({ trustProtoHeader: true }));
    }
    this.express.disable("x-powered-by");
    this.express.use(cors());
    this.express.use("/graph/user", authTokenSerializerMiddleware("USER"));
    graph({ app: this.express, path: "/graph" });
    this.express.use(router);
    return this;
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
