'use client';

import React, { useMemo, useState } from 'react';
import { Post } from './Post';
import { PostWithImagesAndLikesResponse } from '@/types';

type Props = {
  posts: PostWithImagesAndLikesResponse[];
};

export const ProfilePostsFeed = (props: Props): JSX.Element => {
  const { posts } = props;

  const [deletedPostsIds, setDeletedPostsIds] = useState<string[]>([]);

  const filteredPosts = useMemo(
    () => posts.filter((post) => !deletedPostsIds.includes(post.id)),
    [deletedPostsIds, posts],
  );

  return (
    <div className="px-[100px] mb-[50px] flex flex-wrap justify-center gap-[30px]">
      {filteredPosts.map((item) => (
        <Post
          key={item.id}
          isProfilePost
          deletedPostsIds={deletedPostsIds}
          setDeletedPostsIds={setDeletedPostsIds}
          {...item}
        />
      ))}
    </div>
  );
};
