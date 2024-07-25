import classNames from 'classnames';
import { Fragment, useEffect, useRef, type FC, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import {
  connectChatThunk,
  disconnectChatThunk,
  getMessagesThunk,
  selectMessages,
} from '@entities/chat';
import { useMessagesProps, useMessagesScroll } from '@entities/chat';
import { getIsNextDayMessage } from '@entities/chat';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from '@shared/lib/hooks';
import { InfinityScroll } from '@shared/ui';
import { MessagesLazy } from './MessageList.lazy';
import styles from './MessageList.module.scss';
import { Message, NotFound, Timestamp } from './ui';

interface MessagesProps {
  select: ReactElement;
  repliedMessage: MessageInterface | null;
  isMessageEditing: boolean;
  selectedMessage: MessageInterface | null;
  handleSelectMessage: (message: MessageInterface) => void;
}

export const MessageList: FC<MessagesProps> = ({
  select,
  repliedMessage,
  isMessageEditing,
  selectedMessage,
  handleSelectMessage,
}) => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams<'chatId'>() as { chatId: string | undefined };

  const { isMessagesLoading, isMessagesEnded, messages } =
    useAppSelector(selectMessages);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );
  const isNotFound = useAppSelector((state) => state.chat.isNotFound);

  const prevChatIdRef = useRef<string | null>(null);

  const {
    getSelectProps,
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
  } = useMessagesProps(selectedMessage);

  const { messagesRef, messagesBottomRef } = useMessagesScroll();
  const controlRef = useRef<null | object>({});

  const delayedGetMessages = useDebouncedCallback(() => {
    dispatch(getMessagesThunk());
  });

  const cn = classNames(
    styles.messages,
    repliedMessage && styles.replying,
    isMessageEditing && styles.messageEditing
  );

  useEffect(() => {
    if (chatId && prevChatIdRef.current !== chatId) {
      if (
        controlRef.current &&
        'forceReset' in controlRef.current &&
        typeof controlRef.current.forceReset === 'function'
      ) {
        controlRef.current.forceReset();
      }

      prevChatIdRef.current = chatId;
    }
  }, [chatId]);

  useEffect(() => {
    return () => {
      if (chatId) {
        dispatch(disconnectChatThunk(chatId));
      }
    };
  }, [dispatch, chatId]);

  useEffect(() => {
    if (chatId && isSocketConnected) {
      dispatch(connectChatThunk({ chatId }));
    }
  }, [dispatch, chatId, isSocketConnected]);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className={cn} ref={messagesRef}>
      {!isMessagesEnded && <MessagesLazy count={4} />}
      <InfinityScroll
        handleLoadMore={delayedGetMessages}
        isLoading={isMessagesLoading}
        isMore={!isMessagesEnded}
        listRef={messagesRef}
        ref={controlRef}
        isReversed
      >
        {messages.map((message: MessageInterface, i) => {
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
                <Message.Select
                  {...getSelectProps(message)}
                  handleSelectMessage={() => handleSelectMessage(message)}
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
      </InfinityScroll>
      <div ref={messagesBottomRef}></div>
    </div>
  );
};
