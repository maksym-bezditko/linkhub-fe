import { gql } from '@apollo/client';

export const GET_FRIENDS_POSTS = gql`
  query {
    getFriendsPosts {
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
