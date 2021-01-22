module.exports = (factory, { UserModel }) => {
  factory.define("User", UserModel, {
    id: factory.chance("guid"),
    firstName: factory.chance("name", { middle: false, last: false }),
    lastName: factory.chance("name", { middle: false, last: false }),
    email: factory.chance("email"),
  });
};
