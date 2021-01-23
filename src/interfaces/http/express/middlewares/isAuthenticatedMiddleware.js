const Status = require("http-status");
const { isEmpty } = require("lodash");

module.exports = () => () => (req, res, next) => {
  if (req.user && !isEmpty(req.user)) return next();
  return res.status(Status.UNAUTHORIZED).json({ message: "UnAuthorized" });
};
