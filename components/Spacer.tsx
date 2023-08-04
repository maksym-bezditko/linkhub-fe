import React from 'react';

type Props = {
  height: number;
};

export const Spacer = ({ height }: Props): JSX.Element => (
  <div className={`h-[${height}px]`}>&nbsp;</div>
);
