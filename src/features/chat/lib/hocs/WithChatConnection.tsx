import { connectChatsThunk } from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { useEffect, type FC } from 'react';

export function WithChatConnection<P extends object>(Component: FC<P>): FC<P> {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    const chatsLength = useAppSelector((state) => state.chat.chats.length);
    const isSocketConnected = useAppSelector(
      (state) => state.chat.isSocketConnected
    );

    useEffect(() => {
      if (chatsLength > 0 && !isSocketConnected) {
        dispatch(connectChatsThunk());
      }
    }, [dispatch, chatsLength, isSocketConnected]);

    return <Component {...props} />;
  };

  return Wrapper;
}
