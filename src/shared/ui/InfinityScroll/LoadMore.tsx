import type { ReactElement } from 'react';
import { forwardRef } from 'react';

interface LoadMoreProps {
  isMore: boolean;
  loader?: ReactElement;
}

export const LoadMore = forwardRef<HTMLDivElement, LoadMoreProps>(
  ({ isMore, loader }, loadRef) => {
    return <div ref={loadRef}>{isMore && loader}</div>;
  }
);
