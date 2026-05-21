import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'cursor-pointer',
        untilPrimary: 'cursor-pointer hover:text-white duration-300 hover:shadow-xs hover:bg-blue',
        primary:
          'w-full lg:w-auto min-h-12 bg-blue text-white cursor-pointer shadow-xs hover:bg-blue/90 font-semibold',
        secondary:
          'cursor-pointer px-4 border flex gap-2 items-center justify-center bg-white rounded-[8px] border-blue text-base font-normal text-black2 hover:text-blue4 hover:border-blue4 active:text-blue3 active::border-blue3',
        application:
          'border rounded-lg hidden group-hover:flex items-center justify-center h-12 px-3 text-lg font-normal border-white text-white2 hover:bg-white hover:text-blue transition-colors duration-200 cursor-pointer w-auto min-w-0 max-w-40',
        auth: 'text-blue4 font-normal text-base leading-6 cursor-pointer active:text-blue3',
        dock: 'rounded-lg bg-blue text-white',
        favorite:
          'cursor-pointer flex items-center border border-blue6 rounded-[8px] bg-white text-black font-medium',
        outline:
          'cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        outlineActive: 'bg-blue2 rounded-sm cursor-pointer',
        emptyArrays: 'bg-blue text-white rounded-lg',
        link: 'text-blue cursor-pointer underline-offset-4 hover:underline',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        ghostActive: 'bg-blue2 rounded-full cursor-pointer',
        ghostDisabled: 'h-12 bg-grey3 rounded-md text-grey5',
        ghostDisabled2: 'bg-grey10 rounded-md text-grey5 cursor-not-allowed',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
