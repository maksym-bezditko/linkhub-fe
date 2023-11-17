import { gql } from '@apollo/client';

export const SEARCH_USERS_QUERY = gql`
  query ($searchUsersInput: SearchUsersInput!) {
    searchUsers(searchUsersInput: $searchUsersInput) {
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
