import { type ComponentType, type FC, useEffect } from 'react';

import {
  getNewMessagesCountThunk,
  useAppDispatch,
} from '@ducks-tinder-client/common';

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
