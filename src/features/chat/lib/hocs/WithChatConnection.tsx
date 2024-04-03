import { connectChatsThunk } from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { useEffect, type FC } from 'react';

export function WithChatConnection<P extends object>(Component: FC<P>): FC<P> {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    const isSocketConnected = useAppSelector(
      (state) => state.chat.isSocketConnected
    );

    useEffect(() => {
      if (!isSocketConnected) {
        dispatch(connectChatsThunk());
      }
    }, [dispatch, isSocketConnected]);

    return <Component {...props} />;
  };

  return Wrapper;
}
