const fs = require("fs");
const path = require("path");

module.exports = (() =>
  fs
    .readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
    })
    .reduce((modelHash, file) => {
      const factoryPath = path.join(__dirname, file);
      const Model = require(factoryPath);
      modelHash[Model.name] = Model;
      return modelHash;
    }, {}))();
