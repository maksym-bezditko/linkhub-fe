'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/landing-section-bgs.module.css';
import { cn } from '@/lib/utils';

export const FullscreeenAuthLoader: React.FC = () => {
  const { status } = useSession();

  return (
    status === 'loading' && (
      <div
        className={cn(
          'fixed top-0 h-[100vh] z-[500] w-[100vw] text-white text-[3vh] flex justify-center items-center',
          styles['first-landing-section'],
        )}
      >
        <span className="w-[48px] h-[48px] border-[5px] border-b-transparent rounded-full inline-block box-border animate-loader"></span>
      </div>
    )
  );
};
