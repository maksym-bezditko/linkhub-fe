import React from 'react';
import { HeaderWithSidebar } from '@/components/HeaderWithSidebar';

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex justify-center items-start py-[20vh] px-[20px]">
      <HeaderWithSidebar />

      {children}
    </div>
  );
};

export default AuthLayout;
