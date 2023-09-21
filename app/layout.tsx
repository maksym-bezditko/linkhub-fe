import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/Providers';
import { FullscreeenLoader } from '@/components/FullscreenLoader';
import styles from '@/styles/landing-section-bgs.module.css';
import { AppBackground } from '@/components/AppBackground';

const inter = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'LinkHub',
  description: 'Website that actually connects people',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'select-none bg-white',
          styles['first-landing-section'],
        )}
      >
        <Providers>
          <AppBackground />
          <FullscreeenLoader />

          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
