const { ApplicationException } = require("../../../../exceptions");

const userAuthenticatedResolver = (fn) => async (...args) => {
  const [, , { user }] = args;
  if (!user) throw new ApplicationException("Access denied", "UnAuthorized");
  return await fn(...args);
};

const adminAuthenticatedResolver = (fn) => async (...args) => {
  const [, , user] = args;
  if (!user && user.role !== "ADMIN") throw new ApplicationException("Access denied", "UnAuthorized");
  return await fn(...args);
};

module.exports = { userAuthenticatedResolver, adminAuthenticatedResolver };
