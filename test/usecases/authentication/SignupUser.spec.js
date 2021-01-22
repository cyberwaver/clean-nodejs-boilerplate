const { expect } = require("chai");
const container = require("src/container");
const { ValidationException } = require("../../../src/exceptions");
const factory = require("../../support/factory");
const signupUser = container.resolve("signupUser");

describe("AUTHENTICATION :: SignupUser", function () {
  context("When request data is missing important data attributes", async () => {
    const requestData = { firstName: "john" };
    it("it should reject with a validation error", async () => {
      await expect(signupUser.execute(requestData)).to.be.rejectedWith(ValidationException);
    });
  });

  context("When request email is associated with a user account", async () => {
    before(async () => {
      await factory.create("User", { email: "hopejedidiah@gmail.com" });
    });

    const requestData = {
      firstName: "Hope",
      lastName: "Praise",
      email: "hopejedidiah@gmail.com",
      password: "blahblah",
      phone: "344834833",
      gender: "M",
    };
    it("it should reject request", async () => {
      await expect(signupUser.execute(requestData)).to.be.rejected;
    });
  });

  context("When request data is okay", async () => {
    it("it should resolve the request and return the just signed up user", async () => {
      const requestData = {
        firstName: "Hope",
        lastName: "Praise",
        email: "hopejedidiah@gmail.com",
        password: "blahblah",
        phone: "344834833",
        gender: "M",
      };
      const user = await signupUser.execute(requestData);
      expect(user).to.include({ email: "hopejedidiah@gmail.com", firstName: "Hope" });
    });
  });
});
