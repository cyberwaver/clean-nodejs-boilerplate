const path = require("path");
const { ApplicationException } = require("../../../exceptions");

const useController = () => (controllerName) => {
  const Controller = require(path.join(__dirname, "../controllers/", controllerName));
  if (Controller) return new Controller().router;
  throw new ApplicationException(`Controller with name: ${controllerName} not found`);
};

module.exports = useController;
