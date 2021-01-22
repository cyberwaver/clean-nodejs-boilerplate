const { ApolloServer, gql } = require("apollo-server-express");
const { UserTypeDef, UserResolvers } = require("./user.schema");
const { AuthenticationTypeDef, AuthenticationResolvers } = require("./authentication.schema");

const Default = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const userGraph = ({ container }) => (options = {}) => {
  const server = new ApolloServer({
    typeDefs: [Default, UserTypeDef, AuthenticationTypeDef],
    resolvers: [UserResolvers, AuthenticationResolvers],
    playground: true,
    introspection: true,
    context: ({ req }) => {
      const graphContainer = container.register({ currentUser: asValue(req.user) }).createScope();
      return {
        user: req.user,
        container: graphContainer.cradle,
      };
    },
  });

  server.applyMiddleware(options);
};

module.exports = userGraph;
