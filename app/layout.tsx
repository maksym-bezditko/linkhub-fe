import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/Sidebar';

const inter = Lato({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'LinkHub',
  description: 'Website that actually connects people',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-greying-blue select-none')}>
        <Header />

        <Sidebar />

        {children}
      </body>
    </html>
  );
}
