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

  const isChatConnected = useAppSelector((state) => state.chat.isChatConnected);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );

  useEffect(() => {
    if (chatId && !isLoading && isSocketConnected) {
      dispatch(connectChatThunk({ chatId }));
    }
  }, [dispatch, isLoading, chatId, isSocketConnected]);

  if (!isChatConnected) {
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
