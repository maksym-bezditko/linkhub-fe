'use client';

import React from 'react';
import { observer } from 'mobx-react';
import styles from '@/styles/landing-section-bgs.module.css';
import { cn } from '@/lib/utils';
import { store } from '@/store';

export const FullscreeenLoader: React.FC = observer(
  () =>
    store.isFullscreenLoaderVisible && (
      <div
        className={cn(
          'fixed top-0 h-[100vh] z-[500] w-[100vw] text-white text-[3vh] flex justify-center items-center',
          styles['first-landing-section'],
        )}
      >
        <span className="w-[48px] h-[48px] border-[5px] border-b-transparent rounded-full inline-block box-border animate-loader"></span>
      </div>
    ),
);
