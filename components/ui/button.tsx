import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { Loader } from '../Loader';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `
    rounded-full
    bg-white
    h-[50px]
    w-[100px]
    transition-all
    duration-200
    text-[20px]
    laptop:text-[16px]
    laptop:h-[40px]
    mobile:text-[14px]
    mobile:w-[90px]
    mini-mobile:text-[13px]
    mini-mobile:w-[60px]
    flex
    justify-center
    items-center
  `,
  {
    variants: {
      variant: {
        lightActionButton: 'hover:bg-primary-green hover:text-white',
        darkActionButton: 'hover:bg-primary-yellow',
        goBack: 'w-[150px] mobile:w-[130px] mini-mobile:w-[100px]',
        auth: 'w-[200px] mobile:w-[180px] mini-mobile:w-[120px] hover:bg-opacity-70',
      },
      size: {
        default: null,
      },
    },
    defaultVariants: {
      variant: 'lightActionButton',
      size: 'default',
    },
  },
);

type CustomButtonProps = {
  isLoading?: boolean;
  loaderSize?: number;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CustomButtonProps,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      variant,
      children,
      className,
      isLoading,
      loaderSize = 24,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? <Loader size={loaderSize} /> : children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
