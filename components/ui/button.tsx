import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

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
  `,
  {
    variants: {
      variant: {
        lightActionButton: 'hover:bg-primary-green hover:text-white',
        darkActionButton: 'hover:bg-primary-yellow',
        login: 'hover:bg-opacity-70',
        goBack: 'w-[150px] mobile:w-[130px] mini-mobile:w-[100px]',
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
