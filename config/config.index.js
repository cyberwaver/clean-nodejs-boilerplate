require("dotenv").config();

const fs = require("fs");
const path = require("path");

const ENV = process.env.NODE_ENV || "development";

const envConfig = require(path.join(__dirname, "environments", ENV));
const dbConfig = loadDbConfig();

const config = Object.assign(
  {
    [ENV]: true,
    env: ENV,
    db: dbConfig,
    TOKEN_SECRET: "BlahBlumBlumDuskety...ah",
  },
  envConfig
);

module.exports = config;

function loadDbConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (fs.existsSync(path.join(__dirname, "./database/knex.config.js"))) {
    return require("./database/knex.config.js")[ENV];
  }
}
