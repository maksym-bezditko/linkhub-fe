'use client';

import React from 'react';
import { LandingPage } from '@/components/LandingPage';
import { useRedirect } from '@/hooks/useRedirect';

export default function HomeView(): JSX.Element {
  useRedirect(true, '/feed');

  return <LandingPage />;
}
