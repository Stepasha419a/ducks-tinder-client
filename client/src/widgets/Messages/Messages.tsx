import { useState, type FC, type ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import type { Message } from '@shared/api/interfaces';
import { useMessagesScroll } from '@entities/chat/lib';
import classNames from 'classnames';
import { MessageList } from '@entities/chat/components';
import { MessageSelect } from '@features/chat';
import styles from './Messages.module.scss';

export const Messages: FC = (): ReactElement => {
  const repliedMessage = useAppSelector((state) => state.chat.repliedMessage);

  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [isMessageEditing, setIsMessageEditing] = useState<boolean>(false);
  const [editingValue, setEditingValue] = useState('');

  const { messagesRef, topScrollRef } = useMessagesScroll();

  const handleSelectMessage = (message: Message) => {
    setEditingValue(message.text);
    setIsMessageEditing(false);
    setCurrentMessage(message);
  };

  const cn = classNames(styles.messages, repliedMessage && styles.replying);

  return (
    <div className={cn} ref={messagesRef}>
      <div className={styles.loadMessages} ref={topScrollRef}></div>
      <MessageList
        currentMessage={currentMessage}
        editingValue={editingValue}
        isMessageEditing={isMessageEditing}
        handleSelectMessage={handleSelectMessage}
        setEditingValue={setEditingValue}
        select={
          <MessageSelect
            key={currentMessage?.id}
            setCurrentMessage={setCurrentMessage}
            currentMessage={currentMessage!}
            setIsMessageEditing={setIsMessageEditing}
            isMessageEditing={isMessageEditing}
            editingValue={editingValue}
          />
        }
      />
    </div>
  );
};
