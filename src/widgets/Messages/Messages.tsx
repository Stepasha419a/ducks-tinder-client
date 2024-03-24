import { useState, type FC, type ReactElement } from 'react';
import { ChatProfile, MessageList } from '@entities/chat/components';
import { EditMessage, MessageSelect, SendMessageForm } from '@features/chat';
import { useAppSelector, useMediaQuery } from '@/shared/lib/hooks';
import type { Message } from '@/shared/api/interfaces';

interface MessagesProps {
  handleOpenPopup: () => void;
}

export const Messages: FC<MessagesProps> = ({
  handleOpenPopup,
}): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const currentMessage = useAppSelector((state) => state.chat.currentMessage);

  const [repliedMessage, setRepliedMessage] = useState<null | Message>(null);
  const [isMessageEditing, setIsMessageEditing] = useState(false);

  const isMobileSelected = currentMessage && !isMessageEditing && isMobile;

  const handleStopMessageEditing = () => {
    setIsMessageEditing(false);
  };

  return (
    <>
      {isMobileSelected ? (
        <MessageSelect
          isMobile
          setRepliedMessage={setRepliedMessage}
          isMessageEditing={isMessageEditing}
          setIsMessageEditing={setIsMessageEditing}
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
          />
        }
        handleStopMessageEditing={handleStopMessageEditing}
      />
      {isMessageEditing ? (
        <EditMessage handleStopMessageEditing={handleStopMessageEditing} />
      ) : (
        <SendMessageForm
          setRepliedMessage={setRepliedMessage}
          repliedMessage={repliedMessage}
        />
      )}
    </>
  );
};
