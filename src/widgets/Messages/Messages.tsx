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

  const isMessageEditing = useAppSelector(
    (state) => state.chat.isMessageEditing
  );
  const currentMessage = useAppSelector((state) => state.chat.currentMessage);

  const [repliedMessage, setRepliedMessage] = useState<null | Message>(null);

  const isMobileSelected = currentMessage && !isMessageEditing && isMobile;

  return (
    <>
      {isMobileSelected ? (
        <MessageSelect isMobile setRepliedMessage={setRepliedMessage} />
      ) : (
        <ChatProfile handleOpen={handleOpenPopup} />
      )}
      <MessageList
        repliedMessage={repliedMessage}
        select={<MessageSelect setRepliedMessage={setRepliedMessage} />}
      />
      {isMessageEditing ? (
        <EditMessage />
      ) : (
        <SendMessageForm
          setRepliedMessage={setRepliedMessage}
          repliedMessage={repliedMessage}
        />
      )}
    </>
  );
};
