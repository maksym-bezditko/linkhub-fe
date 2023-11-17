'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BsLayoutTextSidebar } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react';
import { useMutation } from '@apollo/client';
import { Button } from './ui/button';
import logo from '@/public/logo/png/main_bg.png';
import { cn } from '@/lib/utils';
import { store } from '@/store';
import { UserIdResponse } from '@/types';
import { LOGOUT_MUTATION } from '@/graphql/mutations/logout.mutation';

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
    const [logoutTrigger] = useMutation<UserIdResponse>(LOGOUT_MUTATION);

    const router = useRouter();

    const [isIconHovered, setIsIconHovered] = useState(false);
    const [shouldIgnoreHeaderChange, setShouldIgnoreHeaderChange] =
      useState(false);
    const [loadingButtonType, setLoadingButtonType] = useState<
      'login' | 'sign out' | 'sign up' | 'go back'
    >();

    const handleSignOut = useCallback(async () => {
      setLoadingButtonType('sign out');

      try {
        await logoutTrigger({
          context: {
            headers: { Authorization: `Bearer ${store.accessToken}` },
          },
        });
      } catch (e) {
        console.error('Failed to clear refreshToken from the DB!');
      } finally {
        router.replace('/');

        setShouldIgnoreHeaderChange(true);
        store.setTokens({
          accessToken: null,
          refreshToken: null,
        });

        store.setProfile(null);
      }
    }, [logoutTrigger, router]);

    const handleGoBackClick = useCallback(() => {
      setLoadingButtonType('go back');
      router.push('/');
    }, [router]);

    const buttons = useMemo(() => {
      if (isAuthHeader) {
        return (
          <Button
            variant="darkActionButton"
            className="ml-[30px] mobile:ml-[15px] mini-mobile:ml-[10px] w-[150px]"
            onClick={handleGoBackClick}
            isLoading={loadingButtonType === 'go back'}
          >
            Go Back
          </Button>
        );
      }

      if (store.isAuthenticated) {
        return (
          <Button
            isLoading={loadingButtonType === 'sign out'}
            onClick={handleSignOut}
            variant="lightActionButton"
          >
            Sign out
          </Button>
        );
      }

      return (
        <>
          <Link href="auth/login" onClick={() => setLoadingButtonType('login')}>
            <Button
              variant="lightActionButton"
              isLoading={loadingButtonType === 'login'}
            >
              Login
            </Button>
          </Link>

          <Link
            href="auth/register"
            onClick={() => setLoadingButtonType('sign up')}
          >
            <Button
              variant="darkActionButton"
              isLoading={loadingButtonType === 'sign up'}
              className="ml-[30px] mobile:ml-[15px] mini-mobile:ml-[10px]"
            >
              Sign up
            </Button>
          </Link>
        </>
      );
    }, [handleGoBackClick, handleSignOut, isAuthHeader, loadingButtonType]);

    useEffect(() => {
      if (!isSidebarVisible) {
        setIsIconHovered(false);
      }
    }, [isSidebarVisible]);

    return (
      <header className="absolute h-[125px] top-0 w-full flex flex-row items-center mobile:h-[100px] z-20">
        <div
          className={cn(
            'absolute z-[-50] w-full h-full',
            isAuthHeader ? 'bg-transparent' : 'bg-dark-blue',
          )}
        ></div>

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
          {((!store.isAuthenticated && !shouldIgnoreHeaderChange) ||
            isAuthHeader) && (
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
