const { expect } = require("chai");
const container = require("src/container");
const { ValidationException, ApplicationException, NotFoundException } = require("../../../src/exceptions");
const factory = require("../../support/factory");
const verifyUserEmail = container.resolve("verifyUserEmail");
const tokenService = container.resolve("tokenService");

describe("AUTHENTICATION :: VerifyUserEmail", function () {
  context("When request data is missing important data attributes", async () => {
    const requestData = {};
    it("it should reject with a validation error", async () => {
      await expect(verifyUserEmail.execute(requestData)).to.be.rejectedWith(ValidationException);
    });
  });

  context("When token validation fails", async () => {
    it("it should reject request", async () => {
      const requestData = {
        token: await tokenService.generateCustomTypeToken(
          { email: "hope@fresible.com" },
          { subject: "AUTH", audience: "USER", expiresIn: "1s" }
        ),
      };
      await expect(verifyUserEmail.execute(requestData)).to.be.rejectedWith(ApplicationException);
    });
  });

  context("When decoded token email is not associated with an account", async () => {
    it("it should reject request", async () => {
      const requestData = {
        token: await tokenService.generateCustomTypeToken(
          { email: "hope@fresible.com" },
          { subject: "EMAIL_VERIFICATION", audience: "USER", expiresIn: "24h" }
        ),
      };
      await expect(verifyUserEmail.execute(requestData)).to.be.rejectedWith(NotFoundException);
    });
  });

  context("When email has already been verified", async () => {
    before(async () => {
      await factory.create("User", { email: "hope@fresible.com", isEmailVerified: true });
    });
    it("it should reject request", async () => {
      const requestData = {
        token: await tokenService.generateCustomTypeToken(
          { email: "hope@fresible.com" },
          { subject: "EMAIL_VERIFICATION", audience: "USER", expiresIn: "24h" }
        ),
      };
      await expect(verifyUserEmail.execute(requestData)).to.be.rejectedWith(ApplicationException);
    });
  });

  context("When email has been verified successfully", async () => {
    before(async () => {
      await factory.create("User", { email: "hope@fresible.com", isEmailVerified: false });
    });
    it("it should resolve the request", async () => {
      const requestData = {
        token: await tokenService.generateCustomTypeToken(
          { email: "hope@fresible.com" },
          { subject: "EMAIL_VERIFICATION", audience: "USER", expiresIn: "24h" }
        ),
      };
      const res = await verifyUserEmail.execute(requestData);
      expect(res).to.be.undefined;
    });
  });
});
