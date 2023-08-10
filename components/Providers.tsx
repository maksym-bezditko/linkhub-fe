'use client';

import React, { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: PropsWithChildren): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
};
