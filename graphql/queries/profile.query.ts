import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query {
    getUserById {
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
        caption
        location
        user {
          id
          nickname
        }
        createdAt
        updatedAt
      }
    }
  }
`;
