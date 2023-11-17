import { gql } from '@apollo/client';

export const GET_USER_RECOMMENDATIONS = gql`
  query {
    getRecommendations {
      id
      bio
      firstName
      sex
      lastName
      nickname
      createdAt
      updatedAt
      followedBy {
        followingUserId
        followedUserId
        createdAt
        updatedAt
      }
      following {
        followedUserId
        followingUserId
        createdAt
        updatedAt
      }
      posts {
        id
      }
    }
  }
`;
