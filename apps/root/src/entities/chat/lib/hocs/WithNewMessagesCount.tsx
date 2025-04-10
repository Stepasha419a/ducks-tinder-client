import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';

import { getNewMessagesCountThunk } from '@ducks-tinder-client/common';

import { useAppDispatch } from '@shared/lib';

export function WithNewMessagesCount<P extends object>(
  Component: ComponentType<P>
): FC<P> {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getNewMessagesCountThunk());
    }, [dispatch]);

    return <Component {...props} />;
  };

  return Wrapper;
}
