import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import { Message } from './Message/Message';
import { selectUserChat } from '../../model';
import { MessagesLazy } from './Messages.lazy';
import styles from './Messages.module.scss';
import { useMessagesScroll } from '../../lib';

export const Messages = (): ReactElement => {
  const { currentChatUserObj, messages, currentChat } =
    useAppSelector(selectUserChat);
  const isMessagesInitialLoading = useAppSelector(
    (state) => state.chat.isMessagesInitialLoading
  );
  const maxMessagesCount = useAppSelector(
    (state) => state.chat.maxMessagesCount
  );

  const { messagesRef, topScrollRef } = useMessagesScroll();

  if (isMessagesInitialLoading) {
    return (
      <div className={styles.messages}>
        <MessagesLazy />
      </div>
    );
  }

  return (
    <div className={styles.messages} ref={messagesRef}>
      <div className={styles.loadMessages} ref={topScrollRef}></div>
      {maxMessagesCount > messages.length && (
        <>
          <MessagesLazy count={4} />
        </>
      )}
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
