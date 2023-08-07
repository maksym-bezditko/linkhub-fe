import React, { useMemo } from 'react';
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
import { cn } from '@/lib/utils';
import { usePrevious } from '@/hooks/usePrevious';
import { MenuSection } from '@/types';

type Props = {
  isSidebarVisible: boolean;
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const COMMON_ICON_PROPS: IconBaseProps = {
  className: 'h-[30px] w-[30px] text-white mr-[20px]',
};

export const Sidebar = ({
  isSidebarVisible,
  setIsSidebarVisible,
}: Props): JSX.Element => {
  const isPreviouslyOpened = usePrevious(isSidebarVisible);

  const closeSidebar = () => setIsSidebarVisible(false);

  const menuSections: MenuSection[] = useMemo(
    () => [
      {
        title: 'Main',
        onClick: closeSidebar,
        icon: <LuLayout {...COMMON_ICON_PROPS} />,
      },
      {
        title: 'Search',
        onClick: closeSidebar,
        icon: <LuSearch {...COMMON_ICON_PROPS} />,
      },
      {
        title: 'Explore',
        onClick: closeSidebar,
        icon: <LuCompass {...COMMON_ICON_PROPS} />,
      },
      {
        title: 'Chats',
        onClick: closeSidebar,
        icon: <LuMessageCircle {...COMMON_ICON_PROPS} />,
      },
      {
        title: 'New post',
        onClick: closeSidebar,
        icon: <LuPlusCircle {...COMMON_ICON_PROPS} />,
      },
      {
        title: 'Profile',
        onClick: closeSidebar,
        icon: <LuBook {...COMMON_ICON_PROPS} />,
      },
    ],
    [],
  );

  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] z-10">
      <div
        className={cn(
          'h-full bg-gray-500 opacity-0 w-full top-0 z-10 cursor-pointer',
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
          'absolute top-0 left-0 w-[600px] h-full bg-slate-900 translate-x-[-1000px] z-20 cursor-default flex flex-col justify-center pl-[330px]',
          isSidebarVisible
            ? 'animate-sidebar-appear'
            : isPreviouslyOpened
            ? 'animate-sidebar-disappear'
            : '',
        )}
      >
        <div className="flex flex-col justify-center">
          {menuSections.map(({ onClick, title, icon }) => (
            <Link
              href="/"
              className="text-white text-[15px] my-[20px] h-fit flex flex-row items-center"
              key={title}
              onClick={onClick}
            >
              {icon}
              <p className="text-white relative">{title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
