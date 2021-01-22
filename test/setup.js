const chai = require("chai");
const dirtyChai = require("dirty-chai");
const chaiChange = require("chai-change");
const chaiAsPromised = require("chai-as-promised");
const cleanDatabase = require("./support/cleanDatabase");
const migration = require("./support/migration");

chai.use(dirtyChai);
chai.use(chaiChange);
chai.use(chaiAsPromised);
before(async function () {
  this.timeout(10000);
  // await migration.rollback();
  // await migration.run();
});

afterEach(cleanDatabase);

after(migration.rollback);
