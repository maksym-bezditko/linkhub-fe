'use client';

import React from 'react';
import { observer } from 'mobx-react';
import { LandingPage } from '@/components/LandingPage';

const HomeView = (): JSX.Element => {
  return <LandingPage />;
};

export default observer(HomeView);
