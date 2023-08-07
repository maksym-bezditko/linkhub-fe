import React from 'react';
import { Post } from './Post';
import { Spacer } from './Spacer';
import { MOCK_POSTS } from '@/mock/posts';

export const PostsFeed = (): JSX.Element => {
  return (
    <div className="max-w-[500px] mx-auto my-[50px] flex flex-col items-center">
      {MOCK_POSTS.map((item) => (
        <React.Fragment key={item.id}>
          <Post {...item} />

          <Spacer height={20} />
        </React.Fragment>
      ))}
    </div>
  );
};
