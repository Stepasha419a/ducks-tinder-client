import { Fragment, type FC, type ReactElement } from 'react';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from '@shared/lib/hooks';
import { getMessagesThunk, selectMessages } from '@entities/chat/model';
import { useMessagesProps, useMessagesScroll } from '@entities/chat/lib';
import { getIsNextDayMessage } from '@entities/chat/lib';
import { Message, MessageSelect, Timestamp } from './components';
import { MessagesLazy } from './MessageList.lazy';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';
import styles from './MessageList.module.scss';

interface MessagesProps {
  select: ReactElement;
}

export const MessageList: FC<MessagesProps> = ({ select }) => {
  const dispatch = useAppDispatch();

  const {
    isMessagesInitialLoading,
    isMessagesEnded,
    messages,
    currentMessage,
    isMessageEditing,
    repliedMessage,
  } = useAppSelector(selectMessages);

  const isMessagesLoading = useAppSelector(
    (state) => state.chat.isMessagesLoading
  );

  const {
    handleSelectMessage,
    getSelectProps,
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
  } = useMessagesProps();

  const { messagesRef, messagesBottomRef } = useMessagesScroll();

  const delayedGetMessages = useDebouncedCallback(() => {
    dispatch(getMessagesThunk());
  });

  if (isMessagesInitialLoading) {
    return (
      <div className={styles.messages}>
        <MessagesLazy />
      </div>
    );
  }

  const cn = classNames(
    styles.messages,
    repliedMessage && styles.replying,
    isMessageEditing && styles.messageEditing
  );

  const handleLoadMore = () => {
    if (!isMessagesLoading) delayedGetMessages();
  };

  return (
    <div className={cn} ref={messagesRef}>
      {!isMessagesEnded && <MessagesLazy count={4} />}

      <InfiniteScroll
        loadMore={handleLoadMore}
        hasMore={!isMessagesEnded}
        useWindow={false}
        isReverse
      >
        {messages.map((message: MessageInterface, i) => {
          const isSelectOpen = currentMessage?.id === message.id;
          const isNextDayMessage =
            messages[i + 1] && getIsNextDayMessage(message, messages[i + 1]);

          return (
            <Fragment key={message.id}>
              <Message handleSelectMessage={() => handleSelectMessage(message)}>
                <Message.Avatar
                  userId={message.userId}
                  avatar={message.avatar}
                />
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
      </InfiniteScroll>
      <div ref={messagesBottomRef}></div>
    </div>
  );
};
