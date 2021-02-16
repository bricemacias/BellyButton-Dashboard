import { gql } from '@apollo/client';

// Mutations
const VERIFY_AUTH = gql`
  mutation Verify {
    verifyAuth
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      token
      user {
        name
        email
        role
      }
    }
  }
`;

const LOGOUT = gql`
  mutation Logout($allTokens: Boolean) {
    logoutUser(data: { allTokens: $allTokens })
  }
`;

export { VERIFY_AUTH, LOGIN, LOGOUT };
