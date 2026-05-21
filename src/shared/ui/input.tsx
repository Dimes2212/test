import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-2xl border bg-grey px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: '',
        auth: 'bg-white2 mb-4 rounded-lg h-14 p-2 font-bold active:border-blue hover:border-blue',
        underline: 'border-0 border-b-2 rounded-none bg-transparent px-0 py-1 focus:border-blue',
        minimal: 'bg-white border border-grey4 rounded-lg px-2 py-1 shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type InputProps = React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    icon?: React.ReactNode;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, variant, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(icon ? 'pl-10' : '', inputVariants({ variant, className }))}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
