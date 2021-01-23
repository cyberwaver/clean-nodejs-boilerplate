const { Router } = require("express");
const statusMonitor = require("express-status-monitor");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const methodOverride = require("method-override");
const { asValue } = require("awilix");

module.exports = ({ config }) => ({
  containerMiddleware,
  loggerMiddleware,
  errorHandlerMiddleware,
  useController,
  isAuthenticatedMiddleware,
}) => {
  const router = Router();
  /* istanbul ignore if */
  if (config.env === "development") {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if (config.env !== "test") {
    router.use(loggerMiddleware);
  }

  router
    .use(methodOverride("X-HTTP-Method-Override"))
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware);

  router.use("/auth", useController("AuthController"));

  router.use("/user", isAuthenticatedMiddleware(), useController("UserController"));

  router.use(errorHandlerMiddleware);

  return router;
};
