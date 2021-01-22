const path = require("path");

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
      FROM: "NBA, Lagos Branch <no-reply@nbalagos.ng>",
      NAME: "NBA Lagos",
    },
  },
  external: {
    cloudinary: {
      API_KEY: process.env.CLOUDINARY__API_KEY,
      CLOUD_NAME: process.env.CLOUDINARY__CLOUD_NAME,
      API_SECRET: process.env.CLOUDINARY__API_SECRET,
    },
    sendgrid: {
      API_KEY: process.env.SENDGRID__API_KEY,
    },
    paystack: {
      SECRET_KEY: process.env.PAYSTACK__SECRET_KEY,
      PUBLIC_KEY: process.env.PAYSTACK__PUBLIC_KEY,
    },
    flutterwave: {
      SECRET_KEY: process.env.FLUTTERWAVE__SECRET_KEY,
      PUBLIC_KEY: process.env.FLUTTERWAVE__PUBLIC_KEY,
    },
  },
};
