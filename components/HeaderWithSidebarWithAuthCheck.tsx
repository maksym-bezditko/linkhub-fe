'use client';

import React from 'react';

import { useSession } from 'next-auth/react';
import { HeaderWithSidebar } from './HeaderWithSidebar';

export default function HeaderWithSidebarWithAuthCheck(): JSX.Element {
  const { data: session } = useSession();

  return session?.user ? <HeaderWithSidebar /> : <></>;
}
