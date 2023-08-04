import React, { useEffect } from 'react';

export const usePrevious = (newValue: unknown): unknown => {
  const previousRef = React.useRef<unknown>();

  useEffect(() => {
    previousRef.current = newValue;
  });

  return previousRef.current;
};
