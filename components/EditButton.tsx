import React from 'react';
import { LuEdit } from 'react-icons/lu';

type EditButtonProps = {
  handleClick: () => void;
};

export const EditButton = (props: EditButtonProps): JSX.Element => {
  const { handleClick } = props;

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white cursor-pointer"
    >
      <LuEdit />
    </div>
  );
};
