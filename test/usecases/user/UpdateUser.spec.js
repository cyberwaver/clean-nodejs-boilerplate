const { expect } = require("chai");
const container = require("src/container");
const { NotFoundException } = require("../../../src/exceptions");
const factory = require("../../support/factory");
const updateUser = container.resolve("updateUser");

describe("USER :: UpdateUser", function () {
  const requestData = { firstName: "FIRSTNAME" };
  context("When id is not associated with a user", async () => {
    it("should reject with a NotFoundError", async () => {
      await expect(updateUser.execute(requestData, "ID")).to.be.rejectedWith(NotFoundException);
    });
  });

  context("When user associated with id has been updated", async () => {
    const requestData = { firstName: "FIRSTNAME" };
    before(async () => {
      await factory.create("User", { id: "ID" });
    });
    it("should return the list of users", async () => {
      const user = await updateUser.execute(requestData, "ID");
      expect(user).to.include({ id: "ID", firstName: "FIRSTNAME" });
    });
  });
});
