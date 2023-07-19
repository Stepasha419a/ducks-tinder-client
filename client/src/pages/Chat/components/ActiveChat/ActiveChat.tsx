import { ChatForm, OpenChatProfilePopup } from '@features/chat';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { ChatUserPopup, Messages } from '@widgets';
import { Status } from './components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connectChatThunk, disconnectChatThunk } from '@entities/chat/model';

export const ActiveChat = () => {
  const params = useParams<'chatId'>() as { chatId: string | undefined };

  const dispatch = useAppDispatch();

  const isConnected = useAppSelector((state) => state.chat.isConnected);
  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  useEffect(() => {
    if (params.chatId && params.chatId !== currentChatId && !isLoading) {
      if (currentChatId) dispatch(disconnectChatThunk());
      dispatch(connectChatThunk({ chatId: params.chatId }));
    }
  }, [currentChatId, dispatch, isLoading, params.chatId]);

  if (!isConnected) {
    return <Status />;
  }

  return (
    <>
      <OpenChatProfilePopup />
      <Messages />
      <ChatForm />
      <ChatUserPopup />
    </>
  );
};
