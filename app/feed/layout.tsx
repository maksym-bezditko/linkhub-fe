import React from 'react';
import { HeaderWithSidebar } from '@/components/HeaderWithSidebar';

const FeedLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <main>
      <HeaderWithSidebar />

      {children}
    </main>
  );
};

export default FeedLayout;
