'use client';

import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import Image from 'next/image';
import { PROFILE_QUERY } from '@/graphql/queries/profile.query';
import { store } from '@/store';
import { Image as ImageType, ProfileResponse } from '@/types';
import defaultProfileImage from '@/public/profile/blank-profile-image.jpg';
import { PostsFeed } from '@/components/PostsFeed';
import { Loader } from '@/components/Loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfileView = () => {
  const [profileImage, setProfileImage] = useState<ImageType | null>(null);

  const [isProfileImageLoading, setIsProfileImageLoading] = useState(false);

  const { data, loading: isProfileDataLoading } = useQuery<ProfileResponse>(
    PROFILE_QUERY,
    {
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    },
  );

  const userData = data?.getProfile;

  const isLoading = isProfileImageLoading || isProfileDataLoading;

  useEffect(() => {
    (async () => {
      try {
        setIsProfileImageLoading(true);

        const { data: image } = await axios.get(
          process.env.API_BASE_URL + '/files/retrieve-profile-image',
          {
            headers: {
              Authorization: `Bearer ${store.accessToken}`,
            },
          },
        );

        if (!image) throw new Error();

        setProfileImage(image);
      } catch (e) {
        return;
      } finally {
        setIsProfileImageLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <div className="flex flex-col w-[95%] max-w-[800px] gap-y-[50px]">
        <div className="px-[20px] flex gap-x-[40px] w-full h-full bg-white py-[20px] rounded-full justify-center items-center">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Image
                width={150}
                height={150}
                src={profileImage?.url ?? defaultProfileImage}
                alt="profile image"
                className="rounded-full"
              />

              <div className="grow">
                <p className="mb-[15px] font-extrabold">{userData?.userName}</p>
                <div className="flex flex-row gap-x-[40px] mb-[15px]">
                  <p>Publishes: 0</p>
                  <p>Followers: 0</p>
                  <p>Following: 0</p>
                </div>
                <p className="mb-[15px] font-extrabold">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p className="mb-[15px]">{userData?.bio}</p>
              </div>
            </>
          )}
        </div>
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
          <PostsFeed />
        </TabsContent>
        <TabsContent value="mentions">
          Sorry, this feature is not available yet.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default observer(ProfileView);
