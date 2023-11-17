import { gql } from '@apollo/client';

export const UNFOLLOW_USER_MUTATION = gql`
  mutation ($unfollowUserInput: UnfollowUserInput!) {
    unfollowUser(unfollowUserInput: $unfollowUserInput) {
      succeeded
    }
  }
`;
