const { expect } = require("chai");
const container = require("src/container");
const { ValidationException, ApplicationException, NotFoundException } = require("../../../src/exceptions");
const factory = require("../../support/factory");
const generateUserAuthToken = container.resolve("generateUserAuthToken");
const encryptionService = container.resolve("encryptionService");

describe("AUTHENTICATION :: GenerateUserAuthToken", function () {
  context("When request data is missing important data attributes", async () => {
    const requestData = { email: "hope@fresible.com" };
    it("it should reject with a validation error", async () => {
      await expect(generateUserAuthToken.execute(requestData)).to.be.rejectedWith(ValidationException);
    });
  });

  context("When email is not associated with a user account", async () => {
    const requestData = { email: "hope@fresible.com", password: "blahblah" };
    it("it should reject request", async () => {
      await expect(generateUserAuthToken.execute(requestData)).to.be.rejectedWith(NotFoundException);
    });
  });

  context("When request password does not match associated user account password", async () => {
    before(async () => {
      await factory.create("User", {
        email: "hope@fresible.com",
        password: await encryptionService.encryptPassword("PASSWORD"),
      });
    });
    const requestData = { email: "hope@fresible.com", password: "blahblah" };
    it("it should reject request", async () => {
      await expect(generateUserAuthToken.execute(requestData)).to.be.rejectedWith(ApplicationException);
    });
  });

  context("When auth token has been successfully generated", async () => {
    const password = "PASSWORD";
    before(async () => {
      await factory.create("User", {
        email: "hope@fresible.com",
        password: await encryptionService.encryptPassword(password),
      });
    });
    const requestData = { email: "hope@fresible.com", password };
    it("it should resolve the request and return the token", async () => {
      const token = await generateUserAuthToken.execute(requestData);
      expect(token).to.be.a("string");
    });
  });
});
