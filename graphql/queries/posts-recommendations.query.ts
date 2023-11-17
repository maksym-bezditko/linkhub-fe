import { gql } from '@apollo/client';

export const GET_POSTS_RECOMMENDATIONS = gql`
  query {
    getPostsRecommendations {
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
