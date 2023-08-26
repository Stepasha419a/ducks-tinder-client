import { connectChatsThunk } from '@entities/chat/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { useEffect, type FC } from 'react';

export function WithChatConnection<P extends object>(Component: FC<P>): FC<P> {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    const chatsLength = useAppSelector((state) => state.chat.chats.length);

    useEffect(() => {
      if (chatsLength > 0) {
        dispatch(connectChatsThunk());
      }
    }, [dispatch, chatsLength]);

    return <Component {...props} />;
  };

  return Wrapper;
}
