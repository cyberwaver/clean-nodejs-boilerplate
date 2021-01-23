const path = require("path");
const folderFilesLoader = require("../../../utils/folderFilesLoader");
const router = require("./router");
const Server = require("./Server");
const graph = require("./graph.index");

const middlewareHash = folderFilesLoader(path.join(__dirname, "./middlewares"));

const ExpressServerLoader = (container) => {
  // sync middlewares with container
  const middlewares = Object.entries(middlewareHash).reduce((acc, [name, middleware]) => {
    acc[name] = middleware(container);
    return acc;
  }, {});

  return new Server(container).load({
    router: router(container)(middlewares),
    graph: graph(container),
    ...middlewares,
  });
};

module.exports = ExpressServerLoader;
