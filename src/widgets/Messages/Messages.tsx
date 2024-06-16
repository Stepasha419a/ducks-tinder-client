import { useState, type FC, type ReactElement } from 'react';
import { EditMessage, MessageSelect, SendMessageForm } from '@features/chat';
import { ChatProfile, MessageList } from '@entities/chat';
import type { Message } from '@shared/api/interfaces';
import { useAdaptiveMediaQuery } from '@shared/lib/hooks';

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
