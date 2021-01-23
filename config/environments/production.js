module.exports = {
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
  web: {
    PORT: process.env.PORT,
  },
  logging: {
    appenders: {
      out: { type: "console" },
    },
    categories: {
      default: { appenders: ["out"], level: "info" },
    },
  },
  email: {
    meta: {
      FROM: "YOUR APP, Lagos Branch <no-reply@your-app.com>",
      NAME: "Clean Nodejs Boilerplate",
    },
  },
  external: {
    sendgrid: {
      API_KEY: "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",
    },
  },
};
