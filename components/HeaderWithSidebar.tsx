import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const HeaderWithSidebar = (): JSX.Element => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <>
      <Header
        setIsSidebarVisible={setIsSidebarVisible}
        isSidebarVisible={isSidebarVisible}
      />

      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
      />
    </>
  );
};
