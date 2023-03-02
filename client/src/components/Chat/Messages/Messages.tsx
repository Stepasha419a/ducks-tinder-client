import { useEffect, useRef } from 'react';
import { Message } from '../../../models/Chat';
import { useAppSelector } from '../../../redux/store';
import { ChatMessage } from '../../ui';
import { isRefElementVisible, scrollToBottom } from '../utils/ChatUtils';
import styles from './Messages.module.scss';

const Messages = () => {
  const currentChatMembers = useAppSelector(
    (state) => state.chatPage.currentChatMembers
  );
  const messages = useAppSelector((state) => state.chatPage.currentMessages);
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const bottomScrollRef = useRef<HTMLDivElement | null>(null);

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
      {messages.map((message: Message) => {
        const chatMember = currentChatMembers.find(
          (item) => item._id === message.userId
        );
        const isOwn = message.userId === currentUser._id;
        const username = isOwn ? currentUser.name : chatMember?.name!;
        const avatar = isOwn
          ? currentUser.pictures.avatar
          : chatMember?.pictures.avatar;

        return currentChatMembers.length ? (
          <ChatMessage
            key={message.id}
            isOwn={isOwn}
            message={message}
            username={username}
            avatar={avatar}
          />
        ) : (
          <div key={message.id}>loading message...</div>
        );
      })}
    </div>
  );
};

export default Messages;
