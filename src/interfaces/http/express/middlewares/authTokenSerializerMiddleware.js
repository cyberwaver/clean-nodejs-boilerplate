module.exports = ({ tokenService }) => (type = "USER") => async (req, res, next) => {
  const fnMethod = type === "USER" ? "decodeUserAuthToken" : "decodeAdminAuthToken";
  const _noAuth = () => {
    req.user = undefined;
    return next();
  };
  const { authorization, Authorization } = req.headers;
  const authHeader = authorization || Authorization;
  if (!authHeader) return _noAuth();
  const [id, token] = authHeader.split(" ");
  if (!id || !token) return _noAuth();
  if (id.trim().toLowerCase() !== "bearer") return _noAuth();
  try {
    const result = await tokenService[fnMethod](token);
    Object.defineProperty(req, "user", { value: result });
    return next();
  } catch (err) {
    console.log("FAILED: ", err);
    return _noAuth();
  }
};
