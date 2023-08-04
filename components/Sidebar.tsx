import React from 'react';
import { cn } from '@/lib/utils';
import { usePrevious } from '@/hooks/usePrevious';

type Props = {
  isSidebarVisible: boolean;
};

export const Sidebar = ({ isSidebarVisible }: Props): JSX.Element => {
  const isPreviouslyOpened = usePrevious(isSidebarVisible);

  return (
    <div
      className={cn(
        'h-full grow-1 bg-slate-900 opacity-0 w-full fixed top-0 -z-10',
        isSidebarVisible
          ? 'animate-sidebar-overlay-appear'
          : isPreviouslyOpened
          ? 'animate-sidebar-overlay-disappear'
          : '',
      )}
    >
      <div
        className={cn(
          'w-[30%] laptop:w-[50%] mobile:w-[70%] h-full bg-slate-800 translate-x-[-1000px]',
          isSidebarVisible
            ? 'animate-sidebar-appear'
            : isPreviouslyOpened
            ? 'animate-sidebar-disappear'
            : '',
        )}
      ></div>
    </div>
  );
};
