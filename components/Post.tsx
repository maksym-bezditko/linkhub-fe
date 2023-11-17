'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { FaLocationArrow } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import { useMutation } from '@apollo/client';
import { observer } from 'mobx-react';
import { XButton } from './XButton';
import { CommonResponse, PostWithImagesAndLikesResponse } from '@/types';
import { LIKE_POST_MUTATION } from '@/graphql/mutations/like-post.mutation';
import { UNLIKE_POST_MUTATION } from '@/graphql/mutations/unlike-post.mutation';
import { store } from '@/store';
import { DELETE_POST_MUTATION } from '@/graphql/mutations/delete-post.mutation';

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

export const Post = observer(
  (
    props: PostWithImagesAndLikesResponse & {
      isProfilePost?: boolean;
      deletedPostsIds?: string[];
      setDeletedPostsIds?: React.Dispatch<React.SetStateAction<string[]>>;
    },
  ): JSX.Element => {
    const {
      id,
      caption,
      createdAt,
      postImages,
      user,
      likes,
      location,
      isProfilePost = false,
      deletedPostsIds = [],
      setDeletedPostsIds = () => {},
    } = props;

    const [deletePost] = useMutation<CommonResponse>(DELETE_POST_MUTATION, {
      variables: {
        deletePostInput: {
          postId: id,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    });

    const [likePost] = useMutation<CommonResponse>(LIKE_POST_MUTATION, {
      variables: {
        likePostInput: {
          postId: id,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    });

    const [unlikePost] = useMutation<CommonResponse>(UNLIKE_POST_MUTATION, {
      variables: {
        unlikePostInput: {
          postId: id,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    });

    const [usersWhoLikedPostIds, setUsersWhoLikedPostIds] = useState(
      likes.map((like) => like.userId),
    );

    const currentUserId = store.profile?.id ?? '';

    const isLiked = usersWhoLikedPostIds.includes(currentUserId);

    const handleLikeClick = useCallback(async () => {
      try {
        if (isLiked) {
          setUsersWhoLikedPostIds((prev) =>
            prev.filter((id) => id !== currentUserId),
          );

          await unlikePost();

          return;
        }

        setUsersWhoLikedPostIds((prev) => prev.concat(currentUserId));

        await likePost();
      } catch (e) {
        console.error(e);
      }
    }, [currentUserId, isLiked, likePost, unlikePost]);

    const handleDeletePost = useCallback(async () => {
      if (deletedPostsIds.includes(id)) {
        return;
      }

      setDeletedPostsIds((prev) => prev.concat(id));

      await deletePost();
    }, [deletePost, deletedPostsIds, id, setDeletedPostsIds]);

    return (
      <div
        key={id}
        className="bg-dark-blue bg-opacity-70 overflow-hidden pt-[40px] px-[50px] rounded-[15px] w-[500px] laptop:w-[400px] h-[700px] laptop:h-[600px] mobile:w-[300px] mobile:h-[600px] mobile:px-[20px] border relative"
      >
        <div className="flex flex-row justify-between items-center mb-[20px]">
          <div>
            <p className="text-white mb-[10px]">{user.nickname ?? ''}</p>

            <div className="flex flex-row">
              <FaLocationArrow className="mr-[10px] text-orange-500" />

              <p className="text-white text-[10px]">{location}</p>
            </div>
          </div>

          <p className="text-white mobile:text-[12px]">
            {timeAgo.format(new Date(createdAt))}
          </p>
        </div>

        <div className="w-full h-[60%] relative flex justify-center items-center">
          <Image
            src={postImages[0]?.url ?? ''}
            alt="picture"
            fill
            className="rounded-[15px] w-full h-full object-cover object-center"
          />
        </div>

        <div className="flex flex-row justify-between mt-[20px] items-center">
          <div className="flex flex-row items-center">
            <div onClick={handleLikeClick}>
              {isLiked ? (
                <AiFillHeart className="h-[50px] w-[50px] mobile:h-[30px] mobile:w-[30px] text-red-400 cursor-pointer hover:scale-125 transition duration-100" />
              ) : (
                <AiOutlineHeart className="h-[50px] w-[50px] mobile:h-[30px] mobile:w-[30px] text-red-400 cursor-pointer hover:scale-125 transition duration-100" />
              )}
            </div>

            <p className="text-red-400 ml-[10px]">
              {usersWhoLikedPostIds.length} likes
            </p>
          </div>
        </div>

        <div className="rounded-[10px] border-gray-500 border-2 p-[10px] mt-[20px]">
          <p className="text-white">{caption}</p>
        </div>

        {isProfilePost && (
          <div className="absolute top-[10px] right-[10px]">
            <XButton handleClick={handleDeletePost} />
          </div>
        )}
      </div>
    );
  },
);
