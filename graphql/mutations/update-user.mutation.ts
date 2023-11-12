import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      succeeded
    }
  }
`;
