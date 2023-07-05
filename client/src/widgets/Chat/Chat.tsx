import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { Message } from '@shared/api/interfaces';
import { ChatProfile, Messages } from '@entities/chat/components';
import { ChatForm, MessageSelect } from '@features/chat';
import { UserProfilePopup } from '@/features/user';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { useParams } from 'react-router-dom';
import { connectChatThunk, disconnectChatThunk } from '@/entities/chat/model';
import { Status } from './components';

export const Chat = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isConnected = useAppSelector((state) => state.chat.isConnected);
  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  const params = useParams<'chatId'>() as { chatId: string | undefined };

  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [isMessageEditing, setIsMessageEditing] = useState<boolean>(false);
  const [editingValue, setEditingValue] = useState('');

  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const handleSelectMessage = (message: Message) => {
    setEditingValue(message.text);
    setIsMessageEditing(false);
    setCurrentMessage(message);
  };

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
      <ChatProfile handleClick={() => setIsPreviewOpen(true)} />
      <Messages
        select={
          <MessageSelect
            setCurrentMessage={setCurrentMessage}
            currentMessage={currentMessage!}
            setIsMessageEditing={setIsMessageEditing}
            isMessageEditing={isMessageEditing}
            editingValue={editingValue}
          />
        }
        currentMessage={currentMessage}
        isMessageEditing={isMessageEditing}
        handleSelectMessage={handleSelectMessage}
        editingValue={editingValue}
        setEditingValue={setEditingValue}
      />
      <ChatForm />
      {isPreviewOpen && (
        <UserProfilePopup handleClose={() => setIsPreviewOpen(false)} />
      )}
    </>
  );
};
