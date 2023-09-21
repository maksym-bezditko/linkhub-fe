import { gql } from '@apollo/client';

export const CHECK_FOR_EMAIL_EXISTENCE_QUERY = gql`
  query ($checkForEmailExistenceInput: CheckForEmailExistenceInput!) {
    checkForEmailExistence(
      checkForEmailExistenceInput: $checkForEmailExistenceInput
    ) {
      succeeded
    }
  }
`;
