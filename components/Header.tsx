'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BsLayoutTextSidebar } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from '@/public/logo/png/main_bg.png';
import { cn } from '@/lib/utils';
import { store } from '@/store';

const SIDEBAR_WRAPPER_CLASSNAMES =
  'h-[25px] w-[150px] laptop:h-[20px] laptop:w-[130px] mobile:h-[20px] mobile:w-[110px] mini-mobile:h-[15px]';

const APPEAR_ANIMATION_DURATION = 1;

const ADDITIONAL_INFO_ITEMS = [
  {
    name: 'About us',
    onClick: () => {},
  },
  {
    name: 'Upcoming features',
    onClick: () => {},
  },
];

type Props = {
  setIsSidebarVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarVisible?: boolean;
  isAuthHeader?: boolean;
};

export const Header = observer(
  ({
    setIsSidebarVisible,
    isSidebarVisible = false,
    isAuthHeader = false,
  }: Props): JSX.Element => {
    const [isIconHovered, setIsIconHovered] = useState(false);
    const [shouldIgnoreHeaderChange, setShouldIgnoreHeaderChange] =
      useState(false);

    const router = useRouter();

    const handleSignOut = useCallback(() => {
      router.replace('/');

      setShouldIgnoreHeaderChange(true);

      store.setTokens({
        accessToken: null,
        refreshToken: null,
      });
    }, [router]);

    const buttons = useMemo(() => {
      if (isAuthHeader) {
        return (
          <Button
            variant="darkActionButton"
            className="ml-[30px] mobile:ml-[15px] mini-mobile:ml-[10px] w-[150px]"
            onClick={router.back}
          >
            Go Back
          </Button>
        );
      }

      if (store.isAuthenticated) {
        return (
          <Button onClick={handleSignOut} variant="lightActionButton">
            Sign out
          </Button>
        );
      }

      return (
        <>
          <Link href="auth/login">
            <Button variant="lightActionButton">Login</Button>
          </Link>

          <Link href="auth/register">
            <Button
              variant="darkActionButton"
              className="ml-[30px] mobile:ml-[15px] mini-mobile:ml-[10px]"
            >
              Sign up
            </Button>
          </Link>
        </>
      );
    }, [handleSignOut, isAuthHeader, router.back]);

    useEffect(() => {
      if (!isSidebarVisible) {
        setIsIconHovered(false);
      }
    }, [isSidebarVisible]);

    return (
      <header className="absolute top-0 h-[15%] w-full flex flex-row items-center mobile:h-[100px] z-20">
        <div
          className={cn(
            'absolute z-[-50] w-full h-full',
            isAuthHeader ? 'bg-transparent' : 'bg-dark-blue',
          )}
        ></div>

        {isAuthHeader ? (
          <div className={SIDEBAR_WRAPPER_CLASSNAMES}></div>
        ) : (
          <BsLayoutTextSidebar
            onClick={() => setIsSidebarVisible?.((prev) => !prev)}
            className={cn(
              SIDEBAR_WRAPPER_CLASSNAMES,
              'duration-100 cursor-pointer',
              isSidebarVisible ? 'text-white' : 'text-primary-grey',
              isIconHovered ? 'text-white' : '',
            )}
            onMouseOver={() => setIsIconHovered(true)}
            onMouseOut={() => setIsIconHovered(false)}
          />
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: APPEAR_ANIMATION_DURATION,
          }}
        >
          <Link
            href="/"
            className="h-full flex justify-center items-center max-w-[200px] pr-[10px]"
          >
            <Image
              src={logo}
              alt="logo"
              className="cursor-pointer object-contain w-full h-full"
            />
          </Link>
        </motion.div>

        <div className="h-full flex flex-row justify-end laptop:justify-end pr-[20px] items-center w-full">
          {(store.isAuthenticated || shouldIgnoreHeaderChange) &&
          !isAuthHeader ? (
            <Input
              className="mx-[30px] laptop:hidden"
              type="text"
              placeholder="Search..."
            />
          ) : (
            <nav className="laptop:hidden">
              <ul className="flex flex-row pr-[20px] text-white cursor-pointer">
                {ADDITIONAL_INFO_ITEMS.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className="mr-[20px] justify-between cursor-pointer"
                      onClick={item.onClick}
                    >
                      <li>{item.name}</li>

                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{
                          duration: APPEAR_ANIMATION_DURATION,
                        }}
                        className="h-[2px] rounded-md bg-white"
                      ></motion.div>
                    </div>
                  );
                })}
              </ul>
            </nav>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: APPEAR_ANIMATION_DURATION,
            }}
            className="flex flex-row h-full items-center"
          >
            {buttons}
          </motion.div>
        </div>
      </header>
    );
  },
);
