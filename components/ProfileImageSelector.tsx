import React, { useCallback, useRef } from 'react';
import Image from 'next/image';
import { LuEdit, LuX } from 'react-icons/lu';
import defaultProfileImage from '@/public/profile/blank-profile-image.jpg';

type Props = {
  setLocalImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  localImageFile?: File;
};

export const ProfileImageSelector: React.FC<Props> = ({
  setLocalImageFile,
  localImageFile,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
  }, [setLocalImageFile]);

  return (
    <div className="flex items-center justify-center relative h-[200px] w-[200px] mb-[40px]">
      <Image
        className="rounded-full w-full h-full object-cover"
        width={200}
        height={200}
        src={
          localImageFile
            ? URL.createObjectURL(localImageFile)
            : defaultProfileImage
        }
        alt="default profile image"
      />

      <div
        onClick={handleInputClick}
        className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white cursor-pointer absolute top-0 right-[-50px]"
      >
        <LuEdit />
      </div>

      <div
        onClick={handleReset}
        className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white cursor-pointer absolute bottom-0 right-[-50px]"
      >
        <LuX />
      </div>

      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        ref={inputRef}
        accept=".jpg, .jpeg, .png, image/*"
      />
    </div>
  );
};
