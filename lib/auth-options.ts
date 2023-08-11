import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import axios from 'axios';
import { API } from './api-paths';
import { LoginWithEmail } from '@/types';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        usernameOrEmail: { label: 'Username or email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'usernameOrEmail' | 'password', string> | undefined,
      ) {
        try {
          const { status, data } = await axios.post(API.auth.login, {
            email: credentials?.usernameOrEmail,
            password: credentials?.password,
          } as LoginWithEmail);

          if (status !== 200) throw new Error();

          console.log(data);

          return data;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};
