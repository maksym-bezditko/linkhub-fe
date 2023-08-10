import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        return await new Promise((res) =>
          res({ name: 'Max', email: 'mb.preply.1@gmail.com', id: '1' }),
        );
      },
    }),
  ],
  // pages: {
  //   signIn: '/auth/login',
  // },
};
