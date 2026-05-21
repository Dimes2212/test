import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from './utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progressClass?: string;
  orientation?: 'horizontal' | 'vertical';
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, progressClass, orientation = 'horizontal', ...props }, ref) => {
    const safeValue = value ?? 0;
    const percentage = Math.min(Math.max(safeValue, 0), 100);
    const isVertical = orientation === 'vertical';

    return (
      <ProgressPrimitive.Root
        ref={ref}
        data-orientation={orientation}
        className={cn(
          'relative overflow-hidden rounded-full bg-gray-200',
          isVertical ? 'w-2 h-full flex flex-col' : 'h-2 w-full',
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'transition-all bg-blue-500',
            isVertical ? 'w-full' : 'h-full',
            progressClass,
          )}
          style={isVertical ? { height: `${percentage}%` } : { width: `${percentage}%` }}
        />
      </ProgressPrimitive.Root>
    );
  },
);

Progress.displayName = 'Progress';

export { Progress };
