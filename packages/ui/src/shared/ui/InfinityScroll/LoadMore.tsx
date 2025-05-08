import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export const LoadMore = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((divProps, loadRef) => {
  return <div {...divProps} ref={loadRef}></div>;
});
