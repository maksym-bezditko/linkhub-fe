import { gql } from '@apollo/client';

export const CHECK_FOR_NICKNAME_EXISTENCE_QUERY = gql`
  query ($checkForNicknameExistenceInput: CheckForUsernameExistenceInput!) {
    checkForNicknameExistence(
      checkForNicknameExistenceInput: $checkForNicknameExistenceInput
    ) {
      succeeded
    }
  }
`;
