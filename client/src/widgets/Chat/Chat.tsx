import type { ReactElement } from 'react';
import { useState } from 'react';
import { useAppSelector } from '@hooks';
import type { Message } from '@shared/api/interfaces';
import { Messages } from '@entities/chat/components';
import { ChatForm, MessageSelect } from '@features/chat';
import { Status } from './components';
import styles from './Chat.module.scss';

export const Chat = (): ReactElement => {
  const isConnected = useAppSelector((state) => state.chat.isConnected);

  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [isMessageEditing, setIsMessageEditing] = useState<boolean>(false);
  const [editingValue, setEditingValue] = useState('');

  const handleSelectMessage = (message: Message) => {
    setEditingValue(message.text);
    setIsMessageEditing(false);
    setCurrentMessage(message);
  };

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
                setIsMessageEditing={setIsMessageEditing}
                isMessageEditing={isMessageEditing}
                editingValue={editingValue}
              />
            }
            currentMessage={currentMessage}
            isMessageEditing={isMessageEditing}
            handleSelectMessage={handleSelectMessage}
            editingValue={editingValue}
            setEditingValue={setEditingValue}
          />
          <ChatForm />
        </>
      )}
    </div>
  );
};
