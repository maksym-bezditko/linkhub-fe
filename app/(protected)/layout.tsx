import React from 'react';
import { HeaderWithSidebar } from '@/components/HeaderWithSidebar';

const FeedLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <main className="pt-[200px] mobile:pt-[150px] flex justify-center items-center">
      <HeaderWithSidebar />

      {children}
    </main>
  );
};

export default FeedLayout;
