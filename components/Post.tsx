import React from 'react';
import Image from 'next/image';
import { FaLocationArrow } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { Post as PostType } from '@/types';

export const Post = ({
  caption,
  likes,
  id,
  location,
  imageUrl,
  userName,
  comments,
}: PostType): JSX.Element => {
  return (
    <div
      key={id}
      className="bg-dark-blue bg-opacity-70 overflow-hidden pt-[20px] px-[50px] rounded-[15px] w-[500px] laptop:w-[400px] h-[700px] laptop:h-[600px] mobile:w-[300px] mobile:h-[600px] mobile:px-[20px] border"
    >
      <div className="flex flex-row justify-between items-center mb-[20px]">
        <div>
          <p className="text-white mb-[10px]">{userName}</p>

          <div className="flex flex-row">
            <FaLocationArrow className="mr-[10px] text-orange-500" />

            <p className="text-white text-[10px]">{location}</p>
          </div>
        </div>

        <p className="text-white mobile:text-[12px]">13 minutes ago</p>
      </div>

      <div className="w-full h-[60%] relative">
        <Image
          src={imageUrl}
          alt="picture"
          fill
          className="rounded-[15px] w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex flex-row justify-between mt-[20px] items-center">
        <div className="flex flex-row items-center">
          <AiOutlineHeart className="h-[50px] w-[50px] mobile:h-[30px] mobile:w-[30px] text-red-400 cursor-pointer hover:scale-125 transition duration-100" />

          <p className="text-red-400 ml-[10px]">{likes} likes</p>
        </div>

        <p className="text-white">{comments?.length ?? 0} comments</p>
      </div>

      <div className="rounded-[10px] border-gray-500 border-2 p-[10px] mt-[20px]">
        <p className="text-white">{caption}</p>
      </div>
    </div>
  );
};
