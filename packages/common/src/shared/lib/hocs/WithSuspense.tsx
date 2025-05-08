import type { ComponentType, ReactElement } from 'react';
import { Suspense } from 'react';

export function WithSuspense<P extends object>(
  Component: ComponentType<P>,
  fallback: ReactElement
) {
  const Wrapper = (props: P) => {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };

  return Wrapper;
}
