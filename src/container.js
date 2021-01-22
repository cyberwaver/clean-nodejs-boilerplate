const { createContainer, asClass, asFunction, asValue, Lifetime } = require("awilix");
const { scopePerRequest } = require("awilix-express");
const config = require("../config/config.index");
const Application = require("./Application");
const Server = require("./interfaces/http/Server");
const router = require("./interfaces/http/router");
const logger = require("./logging/logger");
const userGraph = require("./interfaces/http/apollo-server/graph.index");
const registerListeners = require("./event/registerListeners");

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton(),
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
  })
  .register({
    config: asValue(config),
    container: asValue(container),
  })
  .register({
    currentUser: asValue({ id: "SYSTEM", firstName: "System", role: "SUPER-ADMIN" }),
  })
  .register({
    registerListeners: asFunction(registerListeners).singleton(),
    containerMiddleware: asValue(scopePerRequest(container)),
  });

//GRAPHS
container.register({
  userGraph: asFunction(userGraph).singleton(),
});

//usecases
container.loadModules(["src/usecases/*/*.js"], {
  formatName: (g) => {
    const firstLetter = g.substr(0, 1).toLowerCase();
    return `${firstLetter}${g.substr(1)}`;
  },
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
  },
});

// Middlewares
container.loadModules(["src/interfaces/http/middlewares/**/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asFunction,
  },
});

//Load services as scoped per request
container.loadModules(["src/services/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
  },
});

//Load Repositories as singleton
container.loadModules(["src/repositories/**/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
  },
});

//Load Modules as singleton
container.loadModules(["src/modules/**/!(HttpModule).js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
  },
});

//Load Validators as singleton
container.loadModules(["src/validators/**/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
  },
});

// console.log(JSON.stringify(Object.keys(container.cradle)));

module.exports = container;
