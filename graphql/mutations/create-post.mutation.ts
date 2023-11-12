import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation ($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      caption
      location
      userId
      createdAt
      updatedAt
    }
  }
`;
