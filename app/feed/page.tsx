'use client';

import React from 'react';

import { PostsFeed } from '@/components/PostsFeed';
import { useRedirect } from '@/hooks/useRedirect';

export default function FeedView(): JSX.Element {
  useRedirect(false, '/');

  return <PostsFeed />;
}
