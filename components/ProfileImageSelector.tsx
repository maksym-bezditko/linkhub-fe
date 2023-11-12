import React, { useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { EditButton } from './EditButton';
import { XButton } from './XButton';
import { Loader } from './Loader';
import defaultProfileImage from '@/public/profile/blank-profile-image.jpg';
import { Image as ImageType } from '@/types';

type Props = {
  setLocalImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  localImageFile?: File;
  previousImage?: ImageType | null;
  isLoading?: boolean;
  setPreviousImage?: React.Dispatch<React.SetStateAction<ImageType | null>>;
};

export const ProfileImageSelector: React.FC<Props> = ({
  isLoading,
  localImageFile,
  previousImage,
  setLocalImageFile,
  setPreviousImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const imageUrl = useMemo(() => {
    if (previousImage) {
      return previousImage.url;
    }

    return localImageFile
      ? URL.createObjectURL(localImageFile)
      : defaultProfileImage;
  }, [localImageFile, previousImage]);

  const handleInputClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];

        setLocalImageFile(file);
      }
    },
    [setLocalImageFile],
  );

  const handleReset = useCallback(() => {
    if (!inputRef.current) return;

    setLocalImageFile(undefined);
    inputRef.current.value = '';

    setPreviousImage?.(null);
  }, [setLocalImageFile, setPreviousImage]);

  return (
    <div className="flex items-center justify-center relative h-[200px] w-[200px] mb-[40px]">
      {isLoading ? (
        <Loader color="#fff" size={100} />
      ) : (
        <>
          <Image
            className="rounded-full w-full h-full object-cover"
            width={200}
            height={200}
            src={imageUrl}
            alt="default profile image"
          />

          <div className="absolute top-0 right-[-50px]">
            <EditButton handleClick={handleInputClick} />
          </div>

          <div className="absolute bottom-0 right-[-50px]">
            <XButton handleClick={handleReset} />
          </div>

          <input
            type="file"
            className="hidden"
            onChange={handleChange}
            ref={inputRef}
            accept=".jpg, .jpeg, .png, image/*"
          />
        </>
      )}
    </div>
  );
};
