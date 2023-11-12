import React, { useCallback, useRef } from 'react';
import Image from 'next/image';
import { EditButton } from './EditButton';
import { XButton } from './XButton';
import defaultProfileImage from '@/public/profile/blank-profile-image.jpg';

type Props = {
  setLocalImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  localImageFile?: File;
};

export const PostImageSelector = (props: Props): JSX.Element => {
  const { setLocalImageFile, localImageFile } = props;

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
    <div className="flex items-center justify-center relative h-[50vh] w-full mb-[40px]">
      <Image
        className="rounded-s w-full h-full object-cover"
        fill
        src={
          localImageFile
            ? URL.createObjectURL(localImageFile)
            : defaultProfileImage
        }
        alt="default profile image"
      />

      <div className="absolute bottom-[-50px] left-[0px]">
        <EditButton handleClick={handleInputClick} />
      </div>

      <div className="absolute bottom-[-50px] right-[0px]">
        <XButton handleClick={handleReset} />
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
