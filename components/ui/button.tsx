import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `
    rounded-full
    bg-white
    h-[50px]
    min-w-[140px]
    transition-all
    duration-200
    text-[20px]
    laptop:text-[16px]
    laptop:h-[40px]
    laptop:min-w-[100px]
    mobile:text-[12px]
    mobile:h-[30px]
    mobile:min-w-[80px]
    mini-mobile:text-[10px]
    mini-mobile:min-w-[50px]
    mini-mobile:h-[25px]
  `,
  {
    variants: {
      variant: {
        lightActionButton: 'hover:bg-slate-300',
        darkActionButton: 'bg-greying-blue text-white hover:bg-slate-600',
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
