import { Fragment, type FC, type ReactElement } from 'react';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/lib/hooks';
import { selectMessages } from '@entities/chat/model';
import { useMessagesProps, useMessagesScroll } from '@entities/chat/lib';
import { getIsNextDayMessage } from '@entities/chat/lib';
import { Message, MessageSelect, Timestamp } from './components';
import { MessagesLazy } from './MessageList.lazy';
import classNames from 'classnames';
import styles from './MessageList.module.scss';

interface MessagesProps {
  select: ReactElement;
}

export const MessageList: FC<MessagesProps> = ({ select }) => {
  const {
    messagesLength,
    isMessagesInitialLoading,
    maxMessagesCount,
    messages,
    currentMessage,
    isMessageEditing,
    repliedMessage,
  } = useAppSelector(selectMessages);

  const {
    handleSelectMessage,
    getAvatarProps,
    getSelectProps,
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
  } = useMessagesProps();

  const { messagesRef, topScrollRef } = useMessagesScroll();

  if (isMessagesInitialLoading) {
    return <MessagesLazy />;
  }

  const cn = classNames(
    styles.messages,
    repliedMessage && styles.replying,
    isMessageEditing && styles.messageEditing
  );

  return (
    <div className={cn} ref={messagesRef}>
      <div className={styles.loadMessages} ref={topScrollRef}></div>
      {maxMessagesCount > messagesLength && <MessagesLazy count={4} />}
      {messages.map((message: MessageInterface, i) => {
        const isSelectOpen = currentMessage?.id === message.id;
        const isNextDayMessage =
          messages[i + 1] && getIsNextDayMessage(message, messages[i + 1]);

        return (
          <Fragment key={message.id}>
            <Message handleSelectMessage={() => handleSelectMessage(message)}>
              <Message.Avatar {...getAvatarProps(message)} />
              <Message.Body {...getBodyProps(message)}>
                <Message.Username {...getUsernameProps(message)} />
                <Message.Content>
                  <Message.Reply {...getReplyProps(message)} />
                  <Message.Text {...getTextProps(message)} />
                </Message.Content>
              </Message.Body>
              <MessageSelect
                getSelectProps={() => getSelectProps(message)}
                handleSelectMessage={() => handleSelectMessage(message)}
                isSelectOpen={isSelectOpen}
                isMessageEditing={isMessageEditing}
                select={select}
              />
            </Message>
            {isNextDayMessage && (
              <Timestamp createdAt={messages[i + 1].createdAt} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
