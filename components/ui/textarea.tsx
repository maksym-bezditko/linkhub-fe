import * as React from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariant = cva(
  'w-full min-h-[100px] border-[2px] py-[10px] resize-y rounded-lg pl-[30px] caret-white text-white bg-transparent text-[18px]',
  {
    variants: {
      variant: {
        auth: 'bg-transparent text-[18px] px-[15px]',
      },
    },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariant> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariant({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
