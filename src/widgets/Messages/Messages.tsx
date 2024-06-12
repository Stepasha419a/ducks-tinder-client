import { useEffect, useState, type FC, type ReactElement } from 'react';
import { ChatProfile, MessageList } from '@entities/chat/components';
import {
  EditMessage,
  MessageSelect,
  SendMessageForm,
} from '@features/chat/components';
import {
  useAppDispatch,
  useAppSelector,
  useMediaQuery,
} from '@/shared/lib/hooks';
import type { Message } from '@/shared/api/interfaces';
import { useParams } from 'react-router-dom';
import { connectChatThunk, disconnectChatThunk } from '@/entities/chat/model';
import { Status } from './components';

interface MessagesProps {
  handleOpenPopup: () => void;
}

export const Messages: FC<MessagesProps> = ({
  handleOpenPopup,
}): ReactElement => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams<'chatId'>() as { chatId: string | undefined };

  const isMobile = useMediaQuery('(max-width: 900px)');

  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );

  const [selectedMessage, setSelectedMessage] = useState<null | Message>(null);
  const [repliedMessage, setRepliedMessage] = useState<null | Message>(null);
  const [isMessageEditing, setIsMessageEditing] = useState(false);

  useEffect(() => {
    return () => {
      if (chatId) {
        dispatch(disconnectChatThunk(chatId));
      }
    };
  }, [dispatch, chatId]);

  useEffect(() => {
    if (chatId && isSocketConnected) {
      dispatch(connectChatThunk({ chatId }));
    }
  }, [dispatch, chatId, isSocketConnected]);

  if (!currentChatId) {
    return <Status />;
  }

  const handleStopMessageEditing = () => {
    setIsMessageEditing(false);
  };

  const handleNullSelectedMessage = () => {
    setSelectedMessage(null);
  };

  const handleSelectMessage = (message: Message) => {
    handleStopMessageEditing();
    setRepliedMessage(null);
    setSelectedMessage(message);
  };

  const isMobileSelected = selectedMessage && !isMessageEditing && isMobile;

  return (
    <>
      {isMobileSelected ? (
        <MessageSelect
          isMobile
          setRepliedMessage={setRepliedMessage}
          isMessageEditing={isMessageEditing}
          setIsMessageEditing={setIsMessageEditing}
          selectedMessage={selectedMessage}
          handleNullSelectedMessage={handleNullSelectedMessage}
        />
      ) : (
        <ChatProfile handleOpen={handleOpenPopup} />
      )}
      <MessageList
        repliedMessage={repliedMessage}
        isMessageEditing={isMessageEditing}
        select={
          <MessageSelect
            setRepliedMessage={setRepliedMessage}
            isMessageEditing={isMessageEditing}
            setIsMessageEditing={setIsMessageEditing}
            selectedMessage={selectedMessage}
            handleNullSelectedMessage={handleNullSelectedMessage}
          />
        }
        selectedMessage={selectedMessage}
        handleSelectMessage={handleSelectMessage}
      />
      {isMessageEditing ? (
        <EditMessage
          handleStopMessageEditing={handleStopMessageEditing}
          selectedMessage={selectedMessage}
          handleNullSelectedMessage={handleNullSelectedMessage}
        />
      ) : (
        <SendMessageForm
          setRepliedMessage={setRepliedMessage}
          repliedMessage={repliedMessage}
        />
      )}
    </>
  );
};
