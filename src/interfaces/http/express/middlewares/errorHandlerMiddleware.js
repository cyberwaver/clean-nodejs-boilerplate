const Status = require("http-status");

/* istanbul ignore next */
module.exports = ({ logger }) => (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  logger.error(err);
  console.log("SO AN ERROR OCCURED....................... ");
  process.env.NODE_ENV === "development"
    ? res.status(Status.INTERNAL_SERVER_ERROR).json({
        type: "InternalServerError",
        message: err.message,
        stack: err.stack,
      })
    : res.status(Status.INTERNAL_SERVER_ERROR).json({
        type: "InternalServerError",
        message: "The server failed to handle this request",
      });
};
