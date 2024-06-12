import { useEffect, type FC } from 'react';
import { getNewMessagesCountThunk } from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

export function WithNewMessagesCount<P extends object>(
  Component: FC<P>
): FC<P> {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    const newMessagesCount = useAppSelector(
      (state) => state.chat.newMessagesCount
    );

    useEffect(() => {
      if (newMessagesCount === null) {
        dispatch(getNewMessagesCountThunk());
      }
    }, [dispatch, newMessagesCount]);

    return <Component {...props} />;
  };

  return Wrapper;
}
