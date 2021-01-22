const { gql } = require("apollo-server-express");
const { userAuthenticatedResolver } = require("./utils/resolvers");

const AuthenticationTypeDef = gql`
  extend type Query {
    getAuthToken(email: String, password: String): AuthToken!
  }

  extend type Mutation {
    registerUser(input: NewUser): String
    requestPasswordReset(email: String): String
    requestEmailVerification(email: String): String
    resetPassword(input: PasswordReset): String
    changePassword(input: ChangePassword!): String!
    verifyEmail(input: VerifyEmail): String
  }

  type AuthToken {
    token: String
  }

  input PasswordReset {
    password: String
    token: String
  }

  input ChangePassword {
    password: String
    newPassword: String
  }

  input VerifyEmail {
    token: String
  }

  type MutationResponse {
    status: String
    message: String
  }

  type MutationResponseWithData {
    status: String
    message: String
    data: String
  }
`;

const AuthenticationResolvers = {
  Query: {
    getAuthToken: async (_, { email, password }, { container: { generateUserAuthToken } }) => {
      const token = await generateUserAuthToken.execute({ email, password });
      return { token };
    },
  },
  Mutation: {
    registerUser: async (_, { input }, { container: { signupUser } }) => {
      await signupUser.execute(input);
      return "User created successfully";
    },
    requestPasswordReset: async (_, { email }, { container: { requestUserPasswordReset } }) => {
      await requestUserPasswordReset.execute({ email });
      return "Password reset instruction has been sent to the account email";
    },
    requestEmailVerification: async (_, { email }, { container: { requestUserEmailVerification } }) => {
      await requestUserEmailVerification.execute({ email });
      return "Email verification instruction has been sent to the provided email";
    },
    resetPassword: async (_, { input }, { container: { resetUserPassword } }) => {
      await resetUserPassword.execute(input);
      return "Password reset successful";
    },
    changePassword: userAuthenticatedResolver(
      async (_, { input }, { user, container: { changeUserPassword } }) => {
        await changeUserPassword.execute(input, user.id);
        return "Password changed successfully.";
      }
    ),
    verifyEmail: async (_, { input }, { container: { verifyUserEmail } }) => {
      await verifyUserEmail.execute(input);
      return "User email verified successfully";
    },
  },
};

module.exports = { AuthenticationTypeDef, AuthenticationResolvers };
