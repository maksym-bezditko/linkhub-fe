import { gql } from '@apollo/client';

export const FOLLOW_USER_MUTATION = gql`
  mutation ($followUserInput: FollowUserInput!) {
    followUser(followUserInput: $followUserInput) {
      succeeded
    }
  }
`;
