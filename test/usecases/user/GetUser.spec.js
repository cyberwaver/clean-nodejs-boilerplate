const { expect } = require("chai");
const container = require("src/container");
const { NotFoundException } = require("../../../src/exceptions");
const factory = require("../../support/factory");
const getUser = container.resolve("getUser");

describe("USER :: GetUser", function () {
  context("When id is not associated with a user", async () => {
    it("should reject with a NotFoundError", async () => {
      await expect(getUser.execute("ID")).to.be.rejectedWith(NotFoundException);
    });
  });

  context("When id is associated with a user", async () => {
    before(async () => {
      await factory.create("User", { id: "ID" });
    });
    it("should return the list of users", async () => {
      const user = await getUser.execute("ID");
      expect(user).to.include({ id: "ID" });
    });
  });
});
