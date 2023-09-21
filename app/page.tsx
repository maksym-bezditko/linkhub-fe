'use client';

import React from 'react';
import { observer } from 'mobx-react';
import { LandingPage } from '@/components/LandingPage';
import { useRedirect } from '@/hooks/useRedirect';

const HomeView = (): JSX.Element => {
  useRedirect(true, '/feed');

  return <LandingPage />;
};

export default observer(HomeView);
