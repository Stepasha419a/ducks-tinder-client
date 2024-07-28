import { useCallback, useState, type FC, type ReactElement } from 'react';
import { MessageForm } from '@features/MessageForm';
import { MessageSelect } from '@features/MessageSelect';
import { ChatProfile, MessageList } from '@entities/chat';
import type { Message } from '@shared/api';
import { useAdaptiveMediaQuery } from '@shared/lib';

interface MessagesProps {
  handleOpenPopup: () => void;
}

export const Messages: FC<MessagesProps> = ({
  handleOpenPopup,
}): ReactElement => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const [selectedMessage, setSelectedMessage] = useState<null | Message>(null);
  const [repliedMessage, setRepliedMessage] = useState<null | Message>(null);
  const [isMessageEditing, setIsMessageEditing] = useState(false);

  const handleNullSelectedMessage = useCallback(() => {
    setSelectedMessage(null);
  }, []);

  const handleSelectMessage = useCallback((message: Message) => {
    setIsMessageEditing(false);
    setRepliedMessage(null);
    setSelectedMessage(message);
  }, []);

  const handleResetEditReplied = useCallback(() => {
    setRepliedMessage(null);
    setIsMessageEditing(false);
    setSelectedMessage(null);
  }, []);

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
      <MessageForm
        repliedMessage={repliedMessage}
        selectedMessage={selectedMessage}
        isMessageEditing={isMessageEditing}
        handleResetEditReplied={handleResetEditReplied}
      />
    </>
  );
};
