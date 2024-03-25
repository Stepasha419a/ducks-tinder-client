import { useState, type FC, type ReactElement } from 'react';
import { ChatProfile, MessageList } from '@entities/chat/components';
import { EditMessage, MessageSelect, SendMessageForm } from '@features/chat';
import { useMediaQuery } from '@/shared/lib/hooks';
import type { Message } from '@/shared/api/interfaces';

interface MessagesProps {
  handleOpenPopup: () => void;
}

export const Messages: FC<MessagesProps> = ({
  handleOpenPopup,
}): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const [selectedMessage, setSelectedMessage] = useState<null | Message>(null);
  const [repliedMessage, setRepliedMessage] = useState<null | Message>(null);
  const [isMessageEditing, setIsMessageEditing] = useState(false);

  const isMobileSelected = selectedMessage && !isMessageEditing && isMobile;

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
