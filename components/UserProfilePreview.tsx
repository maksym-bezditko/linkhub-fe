import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { Loader } from './Loader';
import { EditButton } from './EditButton';
import { Button } from './ui/button';
import { UserResponse, Image as ImageType, CommonResponse } from '@/types';
import { store } from '@/store';
import defaultProfileImage from '@/public/profile/blank-profile-image.jpg';
import { FOLLOW_USER_MUTATION } from '@/graphql/mutations/follow-user.mutation';
import { UNFOLLOW_USER_MUTATION } from '@/graphql/mutations/unfollow-user.mutation';

type Props = {
  userData: UserResponse['getUserById'] | null;
  withFollowButton?: boolean;
  withEditButton?: boolean;
  isDataLoading?: boolean;
};

export const UserProfilePreview = observer((props: Props): JSX.Element => {
  const {
    userData,
    isDataLoading,
    withEditButton = false,
    withFollowButton = false,
  } = props;

  const [followUser] = useMutation<CommonResponse>(FOLLOW_USER_MUTATION, {
    variables: {
      followUserInput: {
        userId: userData?.id,
      },
    },
    context: {
      headers: {
        Authorization: `Bearer ${store.accessToken}`,
      },
    },
  });

  const [unfollowUser] = useMutation<CommonResponse>(UNFOLLOW_USER_MUTATION, {
    variables: {
      unfollowUserInput: {
        userId: userData?.id,
      },
    },
    context: {
      headers: {
        Authorization: `Bearer ${store.accessToken}`,
      },
    },
  });

  const router = useRouter();

  console.log(userData);

  const [profileImage, setProfileImage] = useState<ImageType | null>(null);
  const [isProfileImageLoading, setIsProfileImageLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    !!userData?.following.find(
      (following) => following.followingUserId === store.profile?.id,
    ),
  );
  const [followersCount, setFollowersCount] = useState(
    userData?.following.length ?? 0,
  );

  const isLoading = isDataLoading || isProfileImageLoading;

  const goToEditPage = () => router.push('/edit-profile');

  const handleClick = useCallback(async () => {
    try {
      if (isFollowed) {
        setIsFollowed(false);
        setFollowersCount((prev) => prev - 1);

        await unfollowUser();

        return;
      }

      setIsFollowed(true);
      setFollowersCount((prev) => prev + 1);

      await followUser();
    } catch (e) {
      console.error(e);
    }
  }, [followUser, isFollowed, unfollowUser]);

  useEffect(() => {
    (async () => {
      try {
        setIsProfileImageLoading(true);

        const { data: image } = await axios.post<ImageType>(
          process.env.API_BASE_URL + '/files/retrieve-profile-image',
          {
            userId: userData?.id ?? '',
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
  }, [userData?.id]);

  return (
    <div className="px-[20px] flex gap-x-[40px] w-full h-full bg-white py-[20px] min-h-[190px] rounded-full justify-center items-center relative">
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
            <p className="mb-[15px] font-extrabold">{userData?.nickname}</p>
            <div className="flex flex-row gap-x-[40px] mb-[15px]">
              <p>Publishes: {userData?.posts.length ?? 0}</p>
              <p>Followers: {followersCount ?? 0}</p>
              <p>Following: {userData?.followedBy.length ?? 0}</p>
            </div>
            <p className="mb-[15px] font-extrabold">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className="mb-[15px]">{userData?.bio}</p>
          </div>
        </>
      )}

      {!isLoading && withEditButton && (
        <div className="absolute right-[-50px] top-[50%] translate-y-[-15px]">
          <EditButton handleClick={goToEditPage} />
        </div>
      )}

      {withFollowButton && (
        <Button
          variant="darkActionButton"
          type="submit"
          className="text-[12px] border"
          onClick={handleClick}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </div>
  );
});
