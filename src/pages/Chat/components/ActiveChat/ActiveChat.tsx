import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSelect, OpenChatProfilePopup } from '@features/chat';
import {
  useAppDispatch,
  useAppSelector,
  useMediaQuery,
} from '@shared/lib/hooks';
import { ChatForm, ChatUserPopup, Messages } from '@widgets';
import { Status } from './components';
import { connectChatThunk, disconnectChatThunk } from '@entities/chat/model';

export const ActiveChat = () => {
  const { chatId } = useParams<'chatId'>() as { chatId: string | undefined };

  const isMobile = useMediaQuery('(max-width: 900px)');

  const dispatch = useAppDispatch();

  const isChatConnected = useAppSelector((state) => state.chat.isChatConnected);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );
  const currentMessage = useAppSelector((state) => state.chat.currentMessage);
  const isMessageEditing = useAppSelector(
    (state) => state.chat.isMessageEditing
  );

  useEffect(() => {
    return () => {
      dispatch(disconnectChatThunk());
    };
  }, [dispatch]);

  useEffect(() => {
    if (chatId && !isLoading && isSocketConnected) {
      dispatch(connectChatThunk({ chatId }));
    }
  }, [dispatch, isLoading, chatId, isSocketConnected]);

  if (!isChatConnected) {
    return <Status />;
  }

  const isMobileSelected = currentMessage && !isMessageEditing && isMobile;

  return (
    <>
      {isMobileSelected ? <MessageSelect isMobile /> : <OpenChatProfilePopup />}
      <Messages />
      <ChatForm />
      <ChatUserPopup />
    </>
  );
};
