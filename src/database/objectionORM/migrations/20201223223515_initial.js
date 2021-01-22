exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.string("id");
      table.increments("cId");
      table.dropPrimary();
      table.primary(["id"]);
      table.string("firstName");
      table.string("lastName");
      table.string("email").unique();
      table.string("password");
      table.string("phone");
      table.string("gender");
      table.string("address");
      table.boolean("isEmailVerified").defaultTo(false);
      table.dateTime("passwordLastResetAt");
      table.json("meta");
      table.dateTime("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table.dateTime("updatedAt");
      table.dateTime("deletedAt");
    })
};

exports.down = function down(knex) {
  return knex.schema
    .dropTableIfExists("users");
};
