const { expect } = require("chai");
const container = require("src/container");
const { ApplicationException, ValidationException, NotFoundException } = require("../../../src/exceptions");
const factory = require("../../support/factory");
const requestUserPasswordReset = container.resolve("requestUserPasswordReset");

describe("AUTHENTICATION :: RequestUserPasswordReset", function () {
  context("When request data is missing important data attributes", async () => {
    const requestData = {};
    it("it should reject with a validation error", async () => {
      await expect(requestUserPasswordReset.execute(requestData)).to.be.rejectedWith(ValidationException);
    });
  });

  context("When email is not associated with a user account", async () => {
    const requestData = { email: "hope@fresible.com" };
    it("it should reject request", async () => {
      await expect(requestUserPasswordReset.execute(requestData)).to.be.rejectedWith(NotFoundException);
    });
  });

  context("When user password request has been successfully logged", async () => {
    before(async () => {
      await factory.create("User", { email: "hope@fresible.com" });
    });
    const requestData = { email: "hope@fresible.com" };
    it("it should resolve the request", async () => {
      const res = await requestUserPasswordReset.execute(requestData);
      expect(res).to.be.undefined;
    });
  });
});
