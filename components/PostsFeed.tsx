import React from 'react';
import { Post } from './Post';
import { MOCK_POSTS } from '@/mock/posts';

export const PostsFeed = (): JSX.Element => {
  return (
    <div className="px-[100px] mb-[50px] flex flex-wrap justify-center gap-[30px]">
      {MOCK_POSTS.map((item) => (
        <Post key={item.id} {...item} />
      ))}
    </div>
  );
};
