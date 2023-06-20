import type { ReactElement } from 'react';
import { useAppSelector, useScrollToBottom } from '@hooks';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import { Message } from './Message/Message';
import styles from './Messages.module.scss';
import { selectUserChat } from '../../model';
import { MessagesLazy } from './Messages.lazy';

export const Messages = (): ReactElement => {
  const { currentChatUserObj, messages, currentChat } =
    useAppSelector(selectUserChat);
  const isMessagesLoading = useAppSelector(
    (state) => state.chat.isMessagesLoading
  );

  const bottomScrollRef = useScrollToBottom([], [messages]);

  if (isMessagesLoading) {
    return <MessagesLazy />;
  }

  return (
    <div className={styles.messages} ref={bottomScrollRef}>
      {messages.map((message: MessageInterface) => {
        const chatMember = currentChat!.users.find(
          (user) => user.id === message.userId
        )!;
        const isOwn = message.userId === currentChatUserObj._id;
        const name = isOwn ? currentChatUserObj.name : chatMember.name;
        const avatar = isOwn
          ? currentChatUserObj.avatar?.name
          : chatMember.pictures[0]?.name;
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
