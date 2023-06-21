import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  closeAllSocketsThunk,
  connectChatThunk,
  disconnectChatThunk,
} from '@entities/chat/model';
import { ChatList } from '@entities/chat/components';

export const OpenChatList = (): ReactElement => {
  const dispatch = useAppDispatch();

  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  useEffect(() => {
    return () => {
      dispatch(closeAllSocketsThunk());
    };
  }, [dispatch]);

  function connect(chatId: string): void {
    if (chatId !== currentChatId && !isLoading) {
      if (currentChatId) dispatch(disconnectChatThunk());
      dispatch(connectChatThunk({ chatId }));
    }
  }

  return <ChatList connect={connect} />;
};
