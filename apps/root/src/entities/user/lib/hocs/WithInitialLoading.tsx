import type { ComponentType, FC } from 'react';

import { InitialLoading } from '@entities/user';

export const WithInitialLoading = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    return (
      <>
        <InitialLoading />
        <Component {...props} />
      </>
    );
  };

  return Wrapper;
};
