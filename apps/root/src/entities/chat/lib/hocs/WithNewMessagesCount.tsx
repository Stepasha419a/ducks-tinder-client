import { getNewMessagesCountThunk } from '@ducks-tinder-client/common';
import type { ComponentType } from 'react';
import { useEffect, type FC } from 'react';
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
