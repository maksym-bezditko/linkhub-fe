import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation ($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      accessToken
      refreshToken
    }
  }
`;
