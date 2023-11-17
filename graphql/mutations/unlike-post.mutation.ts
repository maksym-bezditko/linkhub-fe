import { gql } from '@apollo/client';

export const UNLIKE_POST_MUTATION = gql`
  mutation ($unlikePostInput: UnlikePostInput!) {
    unlikePost(unlikePostInput: $unlikePostInput) {
      succeeded
    }
  }
`;
