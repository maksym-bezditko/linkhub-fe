import React from 'react';
import styles from '@/styles/landing-section-bgs.module.css';
import { cn } from '@/lib/utils';

export const AppBackground: React.FC = () => {
  return (
    <div
      className={cn(
        'fixed top-0 h-[100vh] z-[-500] w-[100vw] text-white text-[3vh] flex justify-center items-center',
        styles['first-landing-section'],
      )}
    ></div>
  );
};
