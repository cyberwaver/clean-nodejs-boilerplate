const path = require("path");
const { factory } = require("factory-girl");
const ObjectionAdapter = require("factory-girl-objection-adapter");
const FactoriesLoader = require("./FactoriesLoader");
const models = require("../../src/database/objectionORM/models/models.index");

const factoryGirl = new factory.FactoryGirl();
factoryGirl.setAdapter(new ObjectionAdapter());

module.exports = FactoriesLoader.load({
  factoryGirl,
  models,
  baseFolder: path.join(__dirname, "factories"),
});
