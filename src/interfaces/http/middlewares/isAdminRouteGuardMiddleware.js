const Status = require("http-status");

module.exports = () => () => (req, res, next) => {
  if (req.user && req.user.role.toLowerCase() === "admin") return next();
  return res.status(Status.UNAUTHORIZED).json({ message: "UnAuthorized" });
};
