'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsChevronDoubleUp, BsChevronDoubleDown } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { HeaderWithSidebar } from './HeaderWithSidebar';
import { cn } from '@/lib/utils';

import '@/styles/landing-section-bgs.css';
import { useWindowSize } from '@/hooks/useWindowSize';

type Section = {
  title: string;
};

const sections: Section[] = [
  {
    title: 'Get your next emotion',
  },
  {
    title: 'Search for an idea...',
  },
  {
    title: 'Follow people and let them follow you back',
  },
  {
    title: 'See it, get inspired, try it!',
  },
];

const sectionBackgroundColors: Record<number, string> = {
  0: 'first-landing-section',
  1: 'second-landing-section',
  2: 'third-landing-section',
  3: 'fourth-landing-section',
};

const sectionTitleColors: Record<number, string> = {
  0: 'text-[#ffffff]',
  1: 'text-[#ffffff]',
  2: 'text-[#ffffff]',
  3: 'text-[#ffffff]',
};

const sectionPointerButtonsColors: Record<number, string> = {
  0: 'text-[#ffffff]',
  1: 'text-[#ffffff]',
  2: 'text-[#ffffff]',
  3: 'text-[#ffffff]',
};

const COMMON_POINTER_ICON_WRAPPER_CLASSES =
  'absolute w-full flex items-center justify-center';

const COMMON_POINTER_ICON_CLASSES =
  'w-[50px] h-[50px] hover:scale-110 transition cursor-pointer';

export const LandingPage = (): JSX.Element => {
  const wrapperRef: React.RefObject<HTMLDivElement> = useRef(null);

  const { height } = useWindowSize();

  const [fixedHeight, setFixedHeight] = useState(height);

  const scrollDown = useCallback(
    () =>
      wrapperRef.current?.scrollBy({
        top: fixedHeight,
        behavior: 'smooth',
      }),
    [fixedHeight],
  );

  const scrollUp = useCallback(
    () =>
      wrapperRef.current?.scrollBy({
        top: -fixedHeight,
        behavior: 'smooth',
      }),
    [fixedHeight],
  );

  useEffect(() => {
    if (fixedHeight === 0 && height > 0) {
      setFixedHeight(height);
    }
  }, [fixedHeight, height]);

  if (fixedHeight === 0) return <></>;

  return (
    <div
      className="overflow-y-auto snap-mandatory snap-y relative"
      style={{
        height: fixedHeight,
      }}
      id="container"
      ref={wrapperRef}
    >
      {sections.map((item, index, arr) => {
        const nextSection = arr[index + 1];

        const prevSection = arr[index - 1];

        return (
          <div
            key={item.title}
            className={`w-full h-full relative snap-start snap-always border-black ${sectionBackgroundColors[index]}`}
          >
            <div
              id={item.title}
              className={`w-full h-full text-[4vh] px-[20px] text-center flex flex-row justify-center items-center ${sectionTitleColors[index]}`}
            >
              <div className="h-[100px] flex flex-row">
                {item.title.split(' ').map((item, index) => {
                  return (
                    <motion.div
                      key={item}
                      className="mr-[10px]"
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: (index + 1) * 0.1,
                      }}
                    >
                      {item}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {nextSection && (
              <motion.div
                className={cn(
                  COMMON_POINTER_ICON_WRAPPER_CLASSES,
                  'bottom-[70px]',
                  sectionPointerButtonsColors[index + 1],
                )}
                animate={{ y: [0, -30] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatType: 'reverse',
                }}
              >
                <BsChevronDoubleDown
                  className={cn(
                    COMMON_POINTER_ICON_CLASSES,
                    `${sectionPointerButtonsColors[index + 1]}`,
                  )}
                  onClick={scrollDown}
                />
              </motion.div>
            )}

            {prevSection && (
              <motion.div
                className={cn(
                  COMMON_POINTER_ICON_WRAPPER_CLASSES,
                  'top-[70px]',
                  sectionPointerButtonsColors[index - 1],
                )}
                animate={{ y: [0, 30] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatType: 'reverse',
                }}
              >
                <BsChevronDoubleUp
                  className={cn(
                    COMMON_POINTER_ICON_CLASSES,
                    `${sectionPointerButtonsColors[index - 1]}`,
                  )}
                  onClick={scrollUp}
                />
              </motion.div>
            )}

            {index === 0 && <HeaderWithSidebar />}
          </div>
        );
      })}
    </div>
  );
};
