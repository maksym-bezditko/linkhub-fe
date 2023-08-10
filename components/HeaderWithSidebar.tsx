'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const HeaderWithSidebar = (): JSX.Element => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { data } = useSession();

  const user = data?.user;

  return (
    <>
      <Header
        setIsSidebarVisible={setIsSidebarVisible}
        isSidebarVisible={isSidebarVisible}
        user={user}
      />

      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
      />
    </>
  );
};
