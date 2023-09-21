import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { apolloClient } from '@/components/Providers';
import { CHECK_FOR_EMAIL_EXISTENCE_QUERY } from '@/graphql/queries/check-for-email-existence.query';
import {
  CheckForEmailExistenceResponse,
  CheckForUsernameExistenceResponse,
} from '@/types';
import { CHECK_FOR_USERNAME_EXISTENCE_QUERY } from '@/graphql/queries/check-for-username-existence.query';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const checkForEmailExistence = async (
  email: string,
): Promise<boolean> => {
  try {
    const { data, error } =
      await apolloClient.query<CheckForEmailExistenceResponse>({
        query: CHECK_FOR_EMAIL_EXISTENCE_QUERY,
        variables: {
          checkForEmailExistenceInput: {
            email,
          },
        },
      });

    if (error || !data || !data.checkForEmailExistence.succeeded) {
      throw new Error();
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const checkForUsernameExistence = async (
  userName: string,
): Promise<boolean> => {
  try {
    const { data, error } =
      await apolloClient.query<CheckForUsernameExistenceResponse>({
        query: CHECK_FOR_USERNAME_EXISTENCE_QUERY,
        variables: {
          checkForUsernameExistenceInput: {
            userName,
          },
        },
      });

    if (error || !data || !data.checkForUsernameExistence.succeeded) {
      throw new Error();
    }

    return true;
  } catch (e) {
    return false;
  }
};
