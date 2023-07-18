import { useState, type FC, type ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import type { Message } from '@shared/api/interfaces';
import { setCurrentMessage, setIsMessageEditing } from '@/entities/chat/model';
import { useMessagesScroll } from '@entities/chat/lib';
import classNames from 'classnames';
import { MessageList } from '@entities/chat/components';
import { EditMessage, MessageSelect } from '@features/chat';
import styles from './Messages.module.scss';

export const Messages: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const repliedMessage = useAppSelector((state) => state.chat.repliedMessage);

  const [editingValue, setEditingValue] = useState('');

  const { messagesRef, topScrollRef } = useMessagesScroll();

  const handleSelectMessage = (message: Message) => {
    setEditingValue(message.text);
    dispatch(setIsMessageEditing(false));
    dispatch(setCurrentMessage(message));
  };

  const cn = classNames(styles.messages, repliedMessage && styles.replying);

  return (
    <div className={cn} ref={messagesRef}>
      <div className={styles.loadMessages} ref={topScrollRef}></div>
      <MessageList
        handleSelectMessage={handleSelectMessage}
        edit={
          <EditMessage
            editingValue={editingValue}
            setEditingValue={setEditingValue}
          />
        }
        select={<MessageSelect editingValue={editingValue} />}
      />
    </div>
  );
};
