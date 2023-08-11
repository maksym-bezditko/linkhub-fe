import React from 'react';
import { cn } from '@/lib/utils';

export const AuthBackground: React.FC = () => {
  return (
    <div
      className={cn(
        'fixed top-0 h-[100vh] z-[-500] w-[100vw] bg-dark-blue text-white text-[3vh] flex justify-center items-center',
      )}
    >
      <div className="absolute top-[10vh] left-[10vh] blur-[400px] bg-opacity-20 bg-white h-[40vh] w-[40vh] rounded-full"></div>
    </div>
  );
};
