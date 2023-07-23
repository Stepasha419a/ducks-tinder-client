import { ChatForm, OpenChatProfilePopup } from '@features/chat';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { ChatUserPopup, Messages } from '@widgets';
import { Status } from './components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connectChatThunk } from '@entities/chat/model';

export const ActiveChat = () => {
  const { chatId } = useParams<'chatId'>() as { chatId: string | undefined };

  const dispatch = useAppDispatch();

  const isConnected = useAppSelector((state) => state.chat.isConnected);
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  useEffect(() => {
    if (chatId && !isLoading) {
      dispatch(connectChatThunk({ chatId }));
    }
  }, [dispatch, isLoading, chatId]);

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
