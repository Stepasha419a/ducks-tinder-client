import type { ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '@hooks';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import {
  isRefElementVisible,
  scrollToBottom,
} from '@shared/helpers';

import { Message } from './Message/Message';
import styles from './Messages.module.scss';

export const Messages = (): ReactElement => {
  const currentChatMembers = useAppSelector(
    (state) => state.chat.currentChatMembers
  );
  const messages = useAppSelector((state) => state.chat.currentMessages);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const bottomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomScrollRef.current) {
      scrollToBottom(bottomScrollRef);
    }
  }, [currentChatMembers]);

  useEffect(() => {
    if (bottomScrollRef.current && isRefElementVisible(bottomScrollRef)) {
      scrollToBottom(bottomScrollRef, true);
    }
  }, [messages]);

  return (
    <div className={styles.messages} ref={bottomScrollRef}>
      {messages.map((message: MessageInterface) => {
        const chatMember = currentChatMembers.find(
          (item) => item._id === message.userId
        );
        const isOwn = message.userId === currentUser._id;
        const messageUser = isOwn ? currentUser : chatMember;

        return (
          <Message
            key={message.id}
            isOwn={isOwn}
            message={message}
            username={messageUser!.name}
            avatar={messageUser?.pictures.avatar}
          />
        );
      })}
    </div>
  );
};
