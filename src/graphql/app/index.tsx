import { gql } from '@apollo/client';

// Queries
const GET_USERS = gql`
  query Users {
    allUsers(role: MEMBER) {
      data {
        name
      }
    }
  }
`;

export { GET_USERS };
