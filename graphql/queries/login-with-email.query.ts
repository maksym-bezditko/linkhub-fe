import { gql } from '@apollo/client';

export const LOGIN_WITH_EMAIL_QUERY = gql`
  query ($loginWithEmailInput: LoginWithEmailInput!) {
    loginWithEmail(loginWithEmailInput: $loginWithEmailInput) {
      accessToken
      refreshToken
    }
  }
`;
