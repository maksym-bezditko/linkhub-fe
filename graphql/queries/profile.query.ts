import { gql } from '@apollo/client';

export const PROFILE_QUERY = gql`
  query {
    getProfile {
      id
      userId
      bio
      firstName
      gender
      lastName
      userName
      createdAt
      updatedAt
    }
  }
`;
