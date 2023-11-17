'use client';

import React from 'react';

import { observer } from 'mobx-react';
import { useQuery } from '@apollo/client';
import { store } from '@/store';
import { UserRecommendationsResponse } from '@/types';
import { GET_USER_RECOMMENDATIONS } from '@/graphql/queries/user-recommendations.query';
import { UserProfilePreview } from '@/components/UserProfilePreview';

const ExplorePage = (): JSX.Element => {
  const { data: userRecommendationResponse } =
    useQuery<UserRecommendationsResponse>(GET_USER_RECOMMENDATIONS, {
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    });

  const recommendations = userRecommendationResponse?.getRecommendations;

  if (!recommendations) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-[95%] max-w-[800px] gap-y-[50px]">
      {recommendations.length === 0 ? (
        <p>
          No recommendations for you, follow somebody who has followings first
        </p>
      ) : (
        recommendations?.map((recommendation) => (
          <UserProfilePreview
            key={recommendation.id}
            userData={recommendation}
            withFollowButton
          />
        ))
      )}
    </div>
  );
};

export default observer(ExplorePage);
