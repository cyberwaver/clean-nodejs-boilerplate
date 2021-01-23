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
      FROM: "Clean Nodejs Boilerplate <yourapp@your-app.com>",
      NAME: "Clean Nodejs Boilerplate",
    },
  },
  nodemailer: {},
  external: {
    sendgrid: {
      API_KEY: "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",
    },
  },
};
