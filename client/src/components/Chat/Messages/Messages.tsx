import { FC, useEffect, useRef } from 'react';
import { IMessage } from '../../../models/IChat';
import { IUser } from '../../../models/IUser';
import { useAppSelector } from '../../../redux/reduxStore';
import { Message } from '../../ui';
import { isRefElementVisible, scrollToBottom } from '../utils/ChatUtils';
import styles from './Messages.module.scss';

interface MessagesProps {
  currentUser: IUser;
}

const Messages: FC<MessagesProps> = ({ currentUser }) => {
  const currentChatMembers = useAppSelector(
    (state) => state.chatPage.currentChatMembers
  );
  const messages = useAppSelector((state) => state.chatPage.currentMessages);

  const bottomScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomScrollRef.current) {
      setTimeout(() => scrollToBottom(bottomScrollRef), 50);
    }
  }, [bottomScrollRef]);

  useEffect(() => {
    if (bottomScrollRef.current && isRefElementVisible(bottomScrollRef)) {
      setTimeout(() => scrollToBottom(bottomScrollRef), 50);
    }
  }, [messages]);

  return (
    <div className={styles.messages} ref={bottomScrollRef}>
      {messages.map((message: IMessage) => {
        const chatMember = currentChatMembers.find(
          (item) => item._id === message.userId
        );
        const isOwn = message.userId === currentUser._id;
        const username = isOwn ? currentUser.name : chatMember?.name!;
        const avatar = isOwn
          ? currentUser.pictures.avatar
          : chatMember?.pictures.avatar;

        return currentChatMembers.length ? (
          <Message
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
