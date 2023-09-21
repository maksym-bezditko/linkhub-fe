'use client';

import React from 'react';

import { observer } from 'mobx-react';
import { PostsFeed } from '@/components/PostsFeed';
import { useRedirect } from '@/hooks/useRedirect';

const FeedView = (): JSX.Element => {
  useRedirect(false, '/');

  return <PostsFeed />;
};

export default observer(FeedView);
