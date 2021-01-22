const { Model } = require("objection");
const pg = require("pg");
const Knex = require("knex");
const ModelKnexConfig = require("../../../../config/config.index").db;
const softDelete = require("objection-soft-delete");
const { NotFoundException } = require("../../../exceptions");

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
  return parseInt(value);
});

pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
  return parseFloat(value);
});

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
  return parseFloat(value);
});

const knex = Knex(ModelKnexConfig);
Model.knex(knex);

//AUTHENTICATE WITH DB
knex
  .raw("SELECT 1+1 as result")
  .then((r) => console.log("Database Connection successful"))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
knex.on("query", (d) => process.env.NODE_ENV === "development" && console.log(d.sql, d.bindings));

class BaseModel extends softDelete({
  columnName: "deletedAt",
  deletedValue: knex.fn.now(),
  notDeletedValue: null,
})(Model) {
  static createNotFoundError(_, error) {
    throw new NotFoundException(error.message);
  }

  static get modelPaths() {
    return [__dirname];
  }
}

module.exports = BaseModel;
