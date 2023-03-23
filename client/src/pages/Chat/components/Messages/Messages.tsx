import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../../hooks';
import { Message as MessageType } from '../../../../models/Chat/Chat';
import {
  isRefElementVisible,
  scrollToBottom,
} from '../../../../shared/helpers';

import { Message } from './Message/Message';
import styles from './Messages.module.scss';

export const Messages = () => {
  const currentChatMembers = useAppSelector(
    (state) => state.chatPage.currentChatMembers
  );
  const messages = useAppSelector((state) => state.chatPage.currentMessages);
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

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
      {messages.map((message: MessageType) => {
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
