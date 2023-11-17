import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
  query {
    getUserPosts {
      id
      postImages {
        url
      }
      likes {
        userId
      }
      caption
      user {
        id
        nickname
      }
      location
      createdAt
      updatedAt
    }
  }
`;
