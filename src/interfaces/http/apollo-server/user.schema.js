const { gql } = require("apollo-server-express");
const { userAuthenticatedResolver } = require("./utils/resolvers");

const UserTypeDef = gql`
  extend type Query {
    user: User!
  }

  extend type Mutation {
    updateUser(input: UpdateUser): User!
  }

  input UpdateUser {
    firstName: String
    lastName: String
    phone: String
    gender: String
  }

  input NewUser {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    gender: String!
  }

  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    gender: String!
  }
`;

const UserResolvers = {
  Query: {
    user: userAuthenticatedResolver(async (_, __, { user, container: { getUser } }) => {
      return await getUser.execute(user.id);
    }),
  },
  Mutation: {
    updateUser: userAuthenticatedResolver(async (_, { input }, { user, container: { updateUser } }) => {
      return await updateUser.execute(input, user.id);
    }),
  },
};

module.exports = { UserTypeDef, UserResolvers };
