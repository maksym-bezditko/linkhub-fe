import { gql } from '@apollo/client';

export const DELETE_POST_MUTATION = gql`
  mutation ($deletePostInput: DeletePostInput!) {
    deletePost(deletePostInput: $deletePostInput) {
      succeeded
    }
  }
`;
