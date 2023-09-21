import React from 'react';
import { Header } from '@/components/Header';

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex justify-center items-start py-[20vh] px-[20px]">
      <Header isAuthHeader />

      {children}
    </div>
  );
};

export default AuthLayout;
