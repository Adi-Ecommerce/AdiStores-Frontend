'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const labelVariants = cva(
  'text-sm leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'font-medium',
        secondary: 'font-normal',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

function Label({
  className,
  variant,
  ...props
}) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants({ variant }), className)}
      {...props} />
  );
}

export { Label };
