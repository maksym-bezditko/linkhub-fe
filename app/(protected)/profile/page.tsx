'use client';

import React from 'react';

import { observer } from 'mobx-react';
import { useQuery } from '@apollo/client';
import { store } from '@/store';
import { PostsWithImageAndLikesResponse } from '@/types';
import { ProfilePostsFeed } from '@/components/ProfilePostsFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { POSTS_QUERY } from '@/graphql/queries/posts.query';
import { UserProfilePreview } from '@/components/UserProfilePreview';

const ProfileView = () => {
  const { data: postsData } = useQuery<PostsWithImageAndLikesResponse>(
    POSTS_QUERY,
    {
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    },
  );

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <div className="flex flex-col w-[95%] max-w-[800px] gap-y-[50px]">
        <UserProfilePreview withEditButton userData={store.profile} />
      </div>

      <Tabs
        defaultValue="publishes"
        className="w-[100%] flex flex-col items-center justify-start mt-[50px]"
      >
        <TabsList className="mb-[30px] w-[95%] max-w-[800px]">
          <TabsTrigger value="publishes">Publishes</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>
        <TabsContent value="publishes">
          <ProfilePostsFeed posts={postsData?.getUserPosts ?? []} />
        </TabsContent>
        <TabsContent value="mentions">
          Sorry, this feature is not available yet.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default observer(ProfileView);
