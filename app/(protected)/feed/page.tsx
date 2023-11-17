'use client';

import React from 'react';

import { observer } from 'mobx-react';
import { useQuery } from '@apollo/client';
import { store } from '@/store';
import { FriendsPostsResponse, PostsRecommendationsResponse } from '@/types';
import { GET_FRIENDS_POSTS } from '@/graphql/queries/friends-posts.query';
import { Post } from '@/components/Post';
import { GET_POSTS_RECOMMENDATIONS } from '@/graphql/queries/posts-recommendations.query';

const FeedPage = (): JSX.Element => {
  const { data: friendsPostsResponse } = useQuery<FriendsPostsResponse>(
    GET_FRIENDS_POSTS,
    {
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    },
  );

  const { data: postsRecommendationsResponse } =
    useQuery<PostsRecommendationsResponse>(GET_POSTS_RECOMMENDATIONS, {
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    });

  const friendsPosts = friendsPostsResponse?.getFriendsPosts;
  const postsRecommendations =
    postsRecommendationsResponse?.getPostsRecommendations;

  if (!friendsPosts || !postsRecommendations) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-start items-center w-[95%] max-w-[800px] gap-y-[50px]">
      {friendsPosts.length === 0 ? (
        <p className="text-white">
          No recommendations for you, follow somebody who has followings first
        </p>
      ) : (
        friendsPosts?.map((recommendation) => (
          <Post key={recommendation.id} {...recommendation} />
        ))
      )}

      <div className="text-white">
        That&apos;s all from recommendations. Here are a few more posts for you:{' '}
      </div>

      {postsRecommendations.length === 0 ? (
        <p className="text-white">
          No posts recommendations for you, try adding hashtags to post captions
        </p>
      ) : (
        postsRecommendations?.map((recommendation) => (
          <Post key={recommendation.id} {...recommendation} />
        ))
      )}
    </div>
  );
};

export default observer(FeedPage);
