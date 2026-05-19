import { getNewMessagesCountThunk } from '@entities/chat/model';
import { useChatDispatch } from '@shared/lib/hooks';
import { type ComponentType, type FC, useEffect } from 'react';

export function WithNewMessagesCount<P extends object>(
  Component: ComponentType<P>
): FC<P> {
  const Wrapper = (props: P) => {
    const dispatch = useChatDispatch();

    useEffect(() => {
      dispatch(getNewMessagesCountThunk());
    }, [dispatch]);

    return <Component {...props} />;
  };

  return Wrapper;
}
