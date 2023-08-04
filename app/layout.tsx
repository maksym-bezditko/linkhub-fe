import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { HeaderWithSidebar } from '@/components/HeaderWithSidebar';
import { cn } from '@/lib/utils';

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
        <HeaderWithSidebar />

        {children}
      </body>
    </html>
  );
}
