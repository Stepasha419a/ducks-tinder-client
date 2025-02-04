import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import {
  useCallback,
  useState,
  type FC,
  type ReactElement,
  useEffect,
} from 'react';
import { MessageForm } from '@features/MessageForm';
import { MessageSelect } from '@features/MessageSelect';
import { ChatProfile, MessageList } from '@entities/chat';
import type { Message } from '@shared/api';
import { useAppSelector } from '@shared/lib';

interface MessagesProps {
  handleOpenPopup: () => void;
}

export const Messages: FC<MessagesProps> = ({
  handleOpenPopup,
}): ReactElement => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const isChatBlocked = useAppSelector(
    (state) => state.chat.activeChat?.blocked
  );

  const [selectedMessage, setSelectedMessage] = useState<null | Message>(null);
  const [repliedMessage, setRepliedMessage] = useState<null | Message>(null);
  const [editingMessage, setEditingMessage] = useState<null | Message>(null);

  const handleNullSelectedMessage = useCallback(() => {
    setSelectedMessage(null);
  }, []);

  const handleSelectMessage = useCallback(
    (message: Message) => {
      if (isChatBlocked) {
        return;
      }

      setEditingMessage(null);
      setRepliedMessage(null);
      setSelectedMessage(message);
    },
    [isChatBlocked]
  );

  const handleResetEditReplied = useCallback(() => {
    setRepliedMessage(null);
    setEditingMessage(null);
    setSelectedMessage(null);
  }, []);

  useEffect(() => {
    if (isChatBlocked) {
      handleResetEditReplied();
    }
  }, [handleResetEditReplied, isChatBlocked]);

  const isMobileSelected = selectedMessage && isMobile;

  return (
    <>
      {isMobileSelected && (
        <MessageSelect
          isMobile
          setRepliedMessage={setRepliedMessage}
          editingMessage={editingMessage}
          setEditingMessage={setEditingMessage}
          selectedMessage={selectedMessage}
          handleNullSelectedMessage={handleNullSelectedMessage}
        />
      )}
      <ChatProfile handleOpen={handleOpenPopup} />
      <MessageList
        repliedMessage={repliedMessage}
        isMessageEditing={Boolean(editingMessage)}
        select={
          <MessageSelect
            setRepliedMessage={setRepliedMessage}
            editingMessage={editingMessage}
            setEditingMessage={setEditingMessage}
            selectedMessage={selectedMessage}
            handleNullSelectedMessage={handleNullSelectedMessage}
          />
        }
        selectedMessage={selectedMessage}
        handleSelectMessage={handleSelectMessage}
      />
      <MessageForm
        repliedMessage={repliedMessage}
        editingMessage={editingMessage}
        handleResetEditReplied={handleResetEditReplied}
      />
    </>
  );
};
