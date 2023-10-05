'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LuLayout,
  LuSearch,
  LuCompass,
  LuMessageCircle,
  LuPlusCircle,
  LuBook,
} from 'react-icons/lu';
import { IconBaseProps } from 'react-icons';
import Link from 'next/link';
import { observer } from 'mobx-react';
import { cn } from '@/lib/utils';
import { usePrevious } from '@/hooks/usePrevious';
import { MenuSection } from '@/types';
import { store } from '@/store';

type Props = {
  isSidebarVisible: boolean;
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const COMMON_ICON_PROPS: IconBaseProps = {
  className: 'h-[30px] w-[30px] text-white mr-[20px]',
};

export const Sidebar = observer(
  ({ isSidebarVisible, setIsSidebarVisible }: Props): JSX.Element => {
    const isPreviouslyOpened = usePrevious(isSidebarVisible);

    const [shouldHideModalOverlay, setShouldHideModalOverlay] = useState(true);

    const closeSidebar = useCallback(
      () => setIsSidebarVisible(false),
      [setIsSidebarVisible],
    );

    const menuSections: MenuSection[] = useMemo(
      () => [
        {
          title: 'Main',
          icon: <LuLayout {...COMMON_ICON_PROPS} />,
          shouldAppear: store.isAuthenticated,
        },
        {
          title: 'Search',
          icon: <LuSearch {...COMMON_ICON_PROPS} />,
          shouldAppear: true,
        },
        {
          title: 'Explore',
          icon: <LuCompass {...COMMON_ICON_PROPS} />,
          shouldAppear: true,
        },
        {
          title: 'Chats',
          icon: <LuMessageCircle {...COMMON_ICON_PROPS} />,
          shouldAppear: store.isAuthenticated,
        },
        {
          title: 'New post',
          icon: <LuPlusCircle {...COMMON_ICON_PROPS} />,
          shouldAppear: store.isAuthenticated,
        },
        {
          title: 'Profile',
          icon: <LuBook {...COMMON_ICON_PROPS} />,
          shouldAppear: store.isAuthenticated,
          href: '/profile',
        },
      ],
      [],
    );

    useEffect(() => {
      const timeout = setTimeout(
        () => setShouldHideModalOverlay(!isSidebarVisible),
        isSidebarVisible ? 0 : 500,
      );

      return () => clearTimeout(timeout);
    }, [isSidebarVisible]);

    return (
      <div
        className={cn(
          'fixed top-0 left-0 h-[100vh] w-[100vw] z-10',
          shouldHideModalOverlay ? 'hidden' : 'block',
        )}
      >
        <div
          className={cn(
            'h-full bg-gray-500 opacity-0 w-full top-0 z-10 cursor-pointer border',
            isSidebarVisible
              ? 'animate-sidebar-overlay-appear'
              : isPreviouslyOpened
              ? 'animate-sidebar-overlay-disappear'
              : '',
          )}
          onClick={() => setIsSidebarVisible(false)}
        ></div>

        <div
          className={cn(
            'absolute top-0 left-0 w-[600px] h-full bg-dark-blue translate-x-[-1000px] z-20 flex flex-col justify-center pl-[330px]',
            isSidebarVisible
              ? 'animate-sidebar-appear'
              : isPreviouslyOpened
              ? 'animate-sidebar-disappear'
              : '',
          )}
        >
          <div className="flex flex-col justify-center">
            {menuSections.map(
              ({ href = '#', title, icon, shouldAppear }) =>
                shouldAppear && (
                  <Link
                    href={href}
                    className="text-white text-[15px] my-[20px] h-fit flex flex-row items-center"
                    key={title}
                    onClick={closeSidebar}
                  >
                    {icon}
                    <p className="text-white relative">{title}</p>
                  </Link>
                ),
            )}
          </div>
        </div>
      </div>
    );
  },
);
