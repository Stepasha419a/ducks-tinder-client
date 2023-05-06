import type { ReactElement } from 'react';
import { useAppSelector, useScrollToBottom } from '@hooks';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import { Message } from './Message/Message';
import styles from './Messages.module.scss';
import { selectUserChat } from '../../model';

export const Messages = (): ReactElement => {
  const currentChatMembers = useAppSelector(
    (state) => state.chat.currentChatMembers
  );
  const messages = useAppSelector((state) => state.chat.currentMessages);
  const currentUserChatObj = useAppSelector(selectUserChat);

  const bottomScrollRef = useScrollToBottom([currentChatMembers], [messages]);

  return (
    <div className={styles.messages} ref={bottomScrollRef}>
      {messages.map((message: MessageInterface) => {
        const chatMember = currentChatMembers.find(
          (item) => item._id === message.userId
        )!;
        const isOwn = message.userId === currentUserChatObj._id;
        const name = isOwn ? currentUserChatObj.name : chatMember.name;
        const avatar = isOwn
          ? currentUserChatObj.avatar
          : chatMember.pictures.avatar;
        return (
          <Message
            key={message.id}
            isOwn={isOwn}
            message={message}
            username={name}
            avatar={avatar}
          />
        );
      })}
    </div>
  );
};
