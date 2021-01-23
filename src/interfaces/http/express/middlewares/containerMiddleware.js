const containerMiddleware = ({ container }) => (req, _, next) => {
  const scopedContainer = container.createScope();
  if (req.user) {
    scopedContainer.register({
      currentUser: req.user,
    });
  }
  req.container = scopedContainer;
  return next();
};

module.exports = containerMiddleware;
