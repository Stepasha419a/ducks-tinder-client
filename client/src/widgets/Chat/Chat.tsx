import { useState, type ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import type { Message } from '@shared/api/interfaces';
import { Messages } from '@entities/chat/components';
import { ChatForm, MessageSelect } from '@features/chat';
import { Status } from './components';
import styles from './Chat.module.scss';

export const Chat = (): ReactElement => {
  const isConnected = useAppSelector((state) => state.chat.isConnected);

  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);

  return (
    <div className={styles.content}>
      <Status />
      {isConnected && (
        <>
          <Messages
            select={
              <MessageSelect
                setCurrentMessage={setCurrentMessage}
                currentMessage={currentMessage!}
              />
            }
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
          />
          <ChatForm />
        </>
      )}
    </div>
  );
};
