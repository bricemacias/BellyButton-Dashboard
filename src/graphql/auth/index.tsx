import { gql } from '@apollo/client';

// Mutations
const VERIFY_AUTH = gql`
  mutation Verify {
    verifyAuth
  }
`;

export { VERIFY_AUTH };
