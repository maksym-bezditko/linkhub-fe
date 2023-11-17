import { gql } from '@apollo/client';

export const LIKE_POST_MUTATION = gql`
  mutation ($likePostInput: LikePostInput!) {
    likePost(likePostInput: $likePostInput) {
      succeeded
    }
  }
`;
