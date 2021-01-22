const { expect } = require("chai");
const container = require("src/container");
const { ValidationException, NotFoundException, ApplicationException } = require("../../../src/exceptions");
const factory = require("../../support/factory");
const changeUserPassword = container.resolve("changeUserPassword");
const encryptionService = container.resolve("encryptionService");

describe("AUTHENTICATION :: ChangeUserPassword", function () {
  context("When request data is missing important data attributes", async () => {
    const requestData = {};
    it("it should reject with a validation error", async () => {
      await expect(changeUserPassword.execute(requestData, "ID")).to.be.rejectedWith(ValidationException);
    });
  });

  context("When id is not associated with a user", async () => {
    const requestData = {
      password: "PASSWORD",
      newPassword: "NEWPASSWORD",
    };
    it("should reject with a NotFoundError", async () => {
      await expect(changeUserPassword.execute(requestData, "ID")).to.be.rejectedWith(NotFoundException);
    });
  });

  context("When request password do not match user password", async () => {
    const requestData = {
      password: "PASSWORDYY",
      newPassword: "NEWPASSWORD",
    };
    before(async () => {
      await factory.create("User", {
        id: "ID",
        email: "hope@fresible.com",
        password: await encryptionService.encryptPassword("PASSWORD"),
      });
    });
    it("it should reject request", async () => {
      await expect(changeUserPassword.execute(requestData, "ID")).to.be.rejectedWith(ApplicationException);
    });
  });

  context("When request password do not match user password", async () => {
    const requestData = {
      password: "PASSWORD",
      newPassword: "NEWPASSWORD",
    };
    before(async () => {
      await factory.create("User", {
        id: "ID",
        email: "hope@fresible.com",
        password: await encryptionService.encryptPassword("PASSWORD"),
      });
    });
    it("it should reject request", async () => {
      const res = await changeUserPassword.execute(requestData, "ID");
      expect(res).to.be.undefined();
    });
  });
});
