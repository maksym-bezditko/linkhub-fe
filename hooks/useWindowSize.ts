import { useLayoutEffect, useState } from 'react';

type WindowParameters = {
  width: number;
  height: number;
};

export function useWindowSize(): WindowParameters {
  const [size, setSize] = useState<WindowParameters>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
