const { expect } = require("chai");
const container = require("src/container");
const factory = require("../../support/factory");
const getUsers = container.resolve("getUsers");

describe("USER :: GetUsers", function () {
  context("When there are no users", async () => {
    it("should return an empty list", async () => {
      const users = await getUsers.execute();
      expect(users).to.have.lengthOf(0);
    });
  });

  context("When there are users", async () => {
    before(async () => {
      await factory.createMany("User", 5);
    });
    it("should return the list of users", async () => {
      const users = await getUsers.execute();
      expect(users).to.have.lengthOf(5);
    });
  });
});
