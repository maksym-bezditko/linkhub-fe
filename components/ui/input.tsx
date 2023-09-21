import * as React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariant = cva(
  'h-[50px] w-full border-[2px] rounded-lg pl-[30px] caret-white text-white bg-transparent text-[18px]',
  {
    variants: {
      variant: {
        auth: 'bg-transparent text-[18px] px-[15px]',
      },
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariant({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
