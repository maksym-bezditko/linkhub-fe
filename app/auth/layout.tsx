import React from 'react';
import { Header } from '@/components/Header';

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="h-[100vh] w-[100vw] fixed top-0 flex justify-center items-center">
      <Header isAuthHeader />

      {children}
    </div>
  );
};

export default AuthLayout;
