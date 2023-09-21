import React from 'react';

type Props = {
  size?: number;
  color?: string;
};

export const Loader: React.FC<Props> = ({ size = 48, color = '#252B48' }) => {
  return (
    <span
      className="border-[5px] border-b-transparent rounded-full inline-block box-border animate-loader"
      style={{
        height: size,
        width: size,
        borderWidth: 48 / size,
        borderBottomColor: color,
      }}
    ></span>
  );
};
