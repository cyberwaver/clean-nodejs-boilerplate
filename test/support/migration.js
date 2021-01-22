const container = require("../../src/container");
const config = container.resolve("config");

const knex = require("knex")(config.db);

module.exports = {
  run: async () => await knex.migrate.latest(),
  rollback: async () => await knex.migrate.rollback(),
};
