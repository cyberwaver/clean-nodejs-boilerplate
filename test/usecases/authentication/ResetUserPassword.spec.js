const { expect } = require("chai");
const dateFns = require("date-fns");
const container = require("src/container");
const { ValidationException, ApplicationException } = require("../../../src/exceptions");
const factory = require("../../support/factory");
const resetUserPassword = container.resolve("resetUserPassword");
const tokenService = container.resolve("tokenService");

describe("AUTHENTICATION :: ResetUserPassword", function () {
  context("When request data is missing important data attributes", async () => {
    const requestData = {};
    it("it should reject with a validation error", async () => {
      await expect(resetUserPassword.execute(requestData)).to.be.rejectedWith(ValidationException);
    });
  });

  context("When token validation fails", async () => {
    it("it should reject request", async () => {
      const requestData = {
        password: "PASSWORD",
        token: await tokenService.generateCustomTypeToken(
          { email: "hope@fresible.com" },
          { subject: "AUTH", audience: "USER", expiresIn: "1s" }
        ),
      };
      await expect(resetUserPassword.execute(requestData)).to.be.rejectedWith(ApplicationException);
    });
  });

  context("When decoded token email is not associated with an account", async () => {
    it("it should reject request", async () => {
      const requestData = {
        password: "PASSWORD",
        token: await tokenService.generateCustomTypeToken(
          { email: "hope@fresible.com" },
          { subject: "PASSWORD_RESET", audience: "USER", expiresIn: "24h" }
        ),
      };
      await expect(resetUserPassword.execute(requestData)).to.be.rejected;
    });
  });

  context("When user account password was last reset after request token was generated", async () => {
    before(async () => {
      await factory.create("User", {
        email: "hope@fresible.com",
        passwordLastResetAt: dateFns.add(new Date(), { hours: 2 }),
      });
    });
    it("it should reject request", async () => {
      const requestData = {
        password: "PASSWORD",
        token: await tokenService.generateCustomTypeToken(
          { email: "hope@fresible.com" },
          { subject: "PASSWORD_RESET", audience: "USER", expiresIn: "24H" }
        ),
      };
      await expect(resetUserPassword.execute(requestData)).to.be.rejected;
    });
  });

  context("When user account password has been reset successfully", async () => {
    before(async () => {
      await factory.create("User", {
        email: "hope@fresible.com",
        passwordLastResetAt: dateFns.sub(new Date(), { hours: 2 }),
      });
    });
    it("it should resolve request", async () => {
      const requestData = {
        password: "PASSWORD",
        token: await tokenService.generateCustomTypeToken(
          { email: "hope@fresible.com" },
          { subject: "PASSWORD_RESET", audience: "USER", expiresIn: "24H" }
        ),
      };
      const res = await resetUserPassword.execute(requestData);
      expect(res).to.be.undefined;
    });
  });
});
