'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { BsLayoutTextSidebar } from 'react-icons/bs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from '@/public/logo/png/main_bg.png';

export const Header = (): JSX.Element => {
  return (
    <header className="h-[150px] w-full bg-slate-900 flex flex-row items-center mobile:h-[100px]">
      <BsLayoutTextSidebar className="h-[25px] w-[150px] duration-100 text-greying-blue hover:text-white cursor-pointer laptop:h-[20px] laptop:w-[130px] mobile:h-[20px] mobile:w-[110px] mini-mobile:h-[15px]" />

      <Link
        href="/"
        className="h-full flex justify-center items-center max-w-[200px] mobile:max-w-[120px] pr-[10px]"
      >
        <Image
          src={logo}
          alt="logo"
          className="cursor-pointer object-contain w-full h-full"
        />
      </Link>

      <div className="h-full flex flex-row justify-between laptop:justify-end pr-[20px] items-center w-full">
        <Input
          className="mx-[30px] laptop:hidden"
          type="text"
          placeholder="Search..."
        />

        <div className="flex flex-row h-full items-center">
          <Button onClick={() => {}} variant="lightActionButton">
            Login
          </Button>

          <Button
            variant="darkActionButton"
            className="ml-[10px] mini-mobile:ml-[5px]"
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};
