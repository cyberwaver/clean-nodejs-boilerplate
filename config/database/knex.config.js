const path = require("path");

const baseConfig = {
  client: "pg",
  useNullAsDefault: true,
  connection: {
    connectionString: process.env.DB__URL,
    host: process.env.DB__HOST,
    user: process.env.DB__USER,
    password: process.env.DB__PASSWORD,
    dbName: process.env.DB__NAME,
    ssl: { rejectUnauthorized: false },
  },
  pool: {
    // afterCreate: (conn, cb) => {
    //   conn.run("PRAGMA foreign_keys = ON", cb);
    // },
  },
  migrations: {
    directory: path.join(__dirname, "../../src/database/objectionORM/migrations"),
    tableName: "knexMigrations",
  },
  seeds: {
    directory: path.join(__dirname, "../../src/database/objectionORM/seeds"),
    tableName: "knexSeeds",
  },
};

module.exports = {
  production: baseConfig,
  test: {
    ...baseConfig,
    connection: {
      host: process.env.DB_TEST__HOST,
      user: process.env.DB_TEST__USER,
      password: process.env.DB_TEST__PASSWORD,
      database: process.env.DB_TEST__NAME,
    },
  },
  development: {
    ...baseConfig,
    connection: {
      host: process.env.DB__HOST,
      user: process.env.DB__USER,
      password: process.env.DB__PASSWORD,
      database: process.env.DB__NAME,
    },
  },
};
