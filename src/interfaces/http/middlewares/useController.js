const useController = ({ container }) => (controllerName) => (req) => {
  container.register("currentUser", req.user);
  const scopedContainer = container.createScope();
  const controller = scopedContainer.resolve(controllerName);
  console.log("ccc: ", controller.router);
  return controller.router;
};

module.exports = useController;
