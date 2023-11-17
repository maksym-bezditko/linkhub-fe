import { gql } from '@apollo/client';

export const CHECK_FOR_NICKNAME_EXISTENCE_QUERY = gql`
  query ($checkForNicknameExistenceInput: CheckForNicknameExistenceInput!) {
    checkForNicknameExistence(
      checkForNicknameExistenceInput: $checkForNicknameExistenceInput
    ) {
      succeeded
    }
  }
`;
