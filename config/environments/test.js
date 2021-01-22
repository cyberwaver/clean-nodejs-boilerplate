const path = require("path");
const logPath = path.join(__dirname, "../../logs/development.log");

module.exports = {
  web: {
    PORT: 3000,
  },
  logging: {
    appenders: {
      out: { type: "console" },
      task: { type: "dateFile", filename: logPath, pattern: "-dd.log", alwaysIncludePattern: true },
      result: { type: "dateFile", filename: logPath, pattern: "-dd.log", alwaysIncludePattern: true },
      error: { type: "dateFile", filename: logPath, pattern: "-dd.log", alwaysIncludePattern: true },
      default: { type: "dateFile", filename: logPath, pattern: "-dd.log", alwaysIncludePattern: true },
      rate: { type: "dateFile", filename: logPath, pattern: "-dd.log", alwaysIncludePattern: true },
    },
    categories: {
      default: { appenders: ["out", "default"], level: "info" },
      task: { appenders: ["task"], level: "info" },
      result: { appenders: ["result"], level: "info" },
      error: { appenders: ["error"], level: "error" },
      rate: { appenders: ["rate"], level: "info" },
    },
  },
  email: {
    meta: {
      FROM: "NBA Lagos <nbalagos@fresible.com>",
      NAME: "NBA Lagos",
    },
  },
  nodemailer: {},
  external: {
    cloudinary: {
      API_KEY: "986869529452173",
      CLOUD_DAME: "nba-lagos",
      API_SECRET: "_rVUllf0a1z6k1I_eCIzh4sfJGY",
    },
    sendgrid: {
      API_KEY: "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",
    },
    paystack: {
      SECRET_KEY: "sk_live_653d81767e75c4f6f700bba6fa11a5a873868797",
      PUBLIC_KEY: "pk_live_4bf192731ab6359d94e0a539d9796994b62b36c9",
    },
    flutterwave: {
      SECRET_KEY: "FLWSECK_TEST-95e0485f3cbcca74f823b1d02e44384c-X",
      PUBLIC_KEY: "FLWPUBK_TEST-b442f190b9462e1db5e8390209ac8f26-X",
    },
  },
};
