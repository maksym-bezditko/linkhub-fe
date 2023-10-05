'use client';

import React from 'react';

import { observer } from 'mobx-react';
import { PostsFeed } from '@/components/PostsFeed';

const FeedView = (): JSX.Element => {
  return <PostsFeed />;
};

export default observer(FeedView);
