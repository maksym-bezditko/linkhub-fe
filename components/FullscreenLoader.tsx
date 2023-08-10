'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

export const FullscreeenLoader = (): JSX.Element => {
  const { data, status } = useSession();

  return status === 'loading' || (status === 'authenticated' && !data.user) ? (
    <div className="fixed top-0 h-[100vh] z-[500] w-[100vw] text-white text-[3vh] bg-dark-blue flex justify-center items-center">
      Loading...
    </div>
  ) : (
    <></>
  );
};
