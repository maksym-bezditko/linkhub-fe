import { gql } from '@apollo/client';

export const CHECK_FOR_USERNAME_EXISTENCE_QUERY = gql`
  query ($checkForUsernameExistenceInput: CheckForUsernameExistenceInput!) {
    checkForUsernameExistence(
      checkForUsernameExistenceInput: $checkForUsernameExistenceInput
    ) {
      succeeded
    }
  }
`;
