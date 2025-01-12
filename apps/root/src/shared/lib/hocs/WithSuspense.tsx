import type { ComponentType } from 'react';
import { Suspense } from 'react';
import { LoadingPage } from '@shared/ui';

export function WithSuspense<P extends object>(Component: ComponentType<P>) {
  const Wrapper = (props: P) => {
    return (
      <Suspense fallback={<LoadingPage duration={0.25} visible />}>
        <Component {...props} />
      </Suspense>
    );
  };

  return Wrapper;
}
