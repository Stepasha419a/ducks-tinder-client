import { LoadingPage } from '@ducks-tinder-client/ui';
import type { ComponentType } from 'react';
import { Suspense } from 'react';

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
