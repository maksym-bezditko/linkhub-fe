import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query {
    getUserById {
      id
      bio
      firstName
      sex
      lastName
      nickname
      createdAt
      updatedAt
    }
  }
`;
