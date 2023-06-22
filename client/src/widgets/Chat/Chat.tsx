import { useState, type ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import { Messages } from '@entities/chat/components';
import { ChatForm, MessageSelect } from '@features/chat';
import { Status } from './components';
import styles from './Chat.module.scss';

export const Chat = (): ReactElement => {
  const isConnected = useAppSelector((state) => state.chat.isConnected);

  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);

  return (
    <div className={styles.content}>
      <Status />
      {isConnected && (
        <>
          <Messages
            select={
              <MessageSelect
                setCurrentMessageId={setCurrentMessageId}
                currentMessageId={currentMessageId!}
              />
            }
            currentMessageId={currentMessageId}
            setCurrentMessageId={setCurrentMessageId}
          />
          <ChatForm />
        </>
      )}
    </div>
  );
};
