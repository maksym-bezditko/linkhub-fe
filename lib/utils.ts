import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { apolloClient } from '@/components/Providers';
import { CHECK_FOR_EMAIL_EXISTENCE_QUERY } from '@/graphql/queries/check-for-email-existence.query';
import {
  CheckForEmailExistenceResponse,
  CheckForNicknameExistenceResponse,
} from '@/types';
import { CHECK_FOR_NICKNAME_EXISTENCE_QUERY } from '@/graphql/queries/check-for-nickname-existence.query';

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

export const checkForNicknameExistence = async (
  userName: string,
): Promise<boolean> => {
  try {
    const { data, error } =
      await apolloClient.query<CheckForNicknameExistenceResponse>({
        query: CHECK_FOR_NICKNAME_EXISTENCE_QUERY,
        variables: {
          checkForNicknameExistenceInput: {
            userName,
          },
        },
      });

    if (error || !data || !data.checkForNicknameExistence.succeeded) {
      throw new Error();
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const findHashtags = (searchText: string): string[] => {
  const regexp = /\B\#\w\w+\b/g;

  const result = searchText.match(regexp);

  return result ?? [];
};
