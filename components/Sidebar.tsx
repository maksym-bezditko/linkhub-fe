'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LuLayout,
  LuSearch,
  LuCompass,
  LuMessageCircle,
  LuPlusCircle,
  LuBook,
} from 'react-icons/lu';
import { IconBaseProps } from 'react-icons';
import Link from 'next/link';
import { observer } from 'mobx-react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { PostImageSelector } from './PostImageSelector';
import { cn } from '@/lib/utils';
import { usePrevious } from '@/hooks/usePrevious';
import { CreatePostResponse, MenuSection } from '@/types';
import { store } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CREATE_POST_MUTATION } from '@/graphql/mutations/create-post.mutation';

type Props = {
  isSidebarVisible: boolean;
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const COMMON_ICON_PROPS: IconBaseProps = {
  className: 'h-[30px] w-[30px] text-white mr-[20px]',
};

const Sidebar = ({
  isSidebarVisible,
  setIsSidebarVisible,
}: Props): JSX.Element => {
  const [createPost] = useMutation<CreatePostResponse>(CREATE_POST_MUTATION);

  const isPreviouslyOpened = usePrevious(isSidebarVisible);

  const router = useRouter();

  const [shouldHideModalOverlay, setShouldHideModalOverlay] = useState(true);
  const [localImageFile, setLocalImageFile] = useState<File>();

  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const closeSidebar = () => setIsSidebarVisible(false);

  const handleSubmit = useCallback(async () => {
    if (!localImageFile) {
      return;
    }

    const { data, errors } = await createPost({
      variables: {
        createPostInput: {
          caption,
          location: location || null,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    });

    if (errors || !data || !data.createPost) {
      console.error(errors);
    }

    const postId = data?.createPost.id || '';

    const formData = new FormData();

    formData.append('files', localImageFile);
    formData.append('postId', postId);

    await axios.post(
      process.env.API_BASE_URL + '/files/upload-post-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );

    router.push('/profile');
  }, [caption, createPost, localImageFile, location, router]);

  const menuSections: MenuSection[] = useMemo(
    () => [
      {
        title: 'Main',
        icon: <LuLayout {...COMMON_ICON_PROPS} />,
        shouldAppear: store.isAuthenticated,
      },
      {
        title: 'Search',
        icon: <LuSearch {...COMMON_ICON_PROPS} />,
        shouldAppear: true,
      },
      {
        title: 'Explore',
        icon: <LuCompass {...COMMON_ICON_PROPS} />,
        shouldAppear: true,
      },
      {
        title: 'Chats',
        icon: <LuMessageCircle {...COMMON_ICON_PROPS} />,
        shouldAppear: store.isAuthenticated,
      },
      {
        title: 'New post',
        icon: <LuPlusCircle {...COMMON_ICON_PROPS} />,
        shouldAppear: store.isAuthenticated,
      },
      {
        title: 'Profile',
        icon: <LuBook {...COMMON_ICON_PROPS} />,
        shouldAppear: store.isAuthenticated,
        href: '/profile',
      },
    ],
    [],
  );

  useEffect(() => {
    const timeout = setTimeout(
      () => setShouldHideModalOverlay(!isSidebarVisible),
      isSidebarVisible ? 0 : 500,
    );

    return () => clearTimeout(timeout);
  }, [isSidebarVisible]);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 h-[100vh] w-[100vw] z-10',
        shouldHideModalOverlay ? 'hidden' : 'block',
      )}
    >
      <div
        className={cn(
          'h-full bg-gray-500 opacity-0 w-full top-0 z-10 cursor-pointer border',
          isSidebarVisible
            ? 'animate-sidebar-overlay-appear'
            : isPreviouslyOpened
            ? 'animate-sidebar-overlay-disappear'
            : '',
        )}
        onClick={() => setIsSidebarVisible(false)}
      ></div>

      <div
        className={cn(
          'absolute top-0 left-0 w-[600px] h-full bg-dark-blue translate-x-[-1000px] z-20 flex flex-col justify-center pl-[330px]',
          isSidebarVisible
            ? 'animate-sidebar-appear'
            : isPreviouslyOpened
            ? 'animate-sidebar-disappear'
            : '',
        )}
      >
        <div className="flex flex-col justify-center">
          {menuSections.map(({ href = '#', title, icon, shouldAppear }) => {
            if (!shouldAppear) {
              return null;
            }

            if (title === 'New post') {
              return (
                <Dialog key={title}>
                  <DialogTrigger asChild key={title}>
                    <div
                      className="text-white text-[15px] my-[20px] h-fit flex flex-row items-center"
                      key={title}
                      onClick={closeSidebar}
                    >
                      {icon}
                      <p className="text-white relative">{title}</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-slate-500">
                    <DialogHeader>
                      <DialogTitle>Create a post</DialogTitle>
                      <DialogDescription className="text-black">
                        Make sure to add photos, location and caption to create
                        a post
                      </DialogDescription>
                    </DialogHeader>

                    <PostImageSelector
                      setLocalImageFile={setLocalImageFile}
                      localImageFile={localImageFile}
                    />

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                          id="name"
                          placeholder="Caption"
                          className="col-span-3"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                          id="username"
                          placeholder="Location"
                          className="col-span-3"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex justify-center items-center w-full">
                      <Button
                        variant="darkActionButton"
                        type="submit"
                        className="text-[12px] border"
                        onClick={handleSubmit}
                      >
                        Create a post
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              );
            } else {
              return (
                <Link
                  href={href}
                  className="text-white text-[15px] my-[20px] h-fit flex flex-row items-center"
                  key={title}
                  onClick={closeSidebar}
                >
                  {icon}
                  <p className="text-white relative">{title}</p>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default observer(Sidebar);
