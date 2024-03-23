import { useState, type FC, type ReactElement } from 'react';
import { MessageList } from '@entities/chat/components';
import {
  EditMessage,
  MessageSelect,
  OpenChatProfilePopup,
  SendMessageForm,
} from '@features/chat';
import { useAppSelector, useMediaQuery } from '@/shared/lib/hooks';
import type { Message } from '@/shared/api/interfaces';

export const Messages: FC = (): ReactElement => {
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
        <OpenChatProfilePopup />
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
