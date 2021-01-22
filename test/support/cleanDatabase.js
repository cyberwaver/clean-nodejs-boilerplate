const knexCleaner = require("knex-cleaner");
const container = require("../../src/container");
const config = container.resolve("config");

const knex = require("knex")(config.db);
module.exports = async function () {
  return await knexCleaner.clean(knex);
};
