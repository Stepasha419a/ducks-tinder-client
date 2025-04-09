import { type FC, type ReactElement,useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import type { Message as MessageInterface } from '@ducks-tinder-client/common';
import {   connectChatThunk,
  disconnectChatThunk,
  getMessagesThunk,
  selectMessages,
useDebouncedCallback ,
} from '@ducks-tinder-client/common';
import type { ControlRef } from '@ducks-tinder-client/ui';
import { InfinityScroll } from '@ducks-tinder-client/ui';

import { getIsNextDayMessage,useMessagesProps, useMessagesScroll  } from '@entities/chat';
import { useAppDispatch, useAppSelector } from '@shared/lib';

import { Message, MessageMemo, NotFound, Timestamp } from './components';
import { MessagesLazy } from './MessageList.lazy';
import styles from './MessageList.module.scss';

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
  const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);
  const activeChat = useAppSelector((state) => state.chat.activeChat);

  const prevChatIdRef = useRef<string | null>(null);

  const {
    getMessageProps,
    getSelectProps,
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
  } = useMessagesProps(selectedMessage);

  const controlRef = useRef<ControlRef>(null);
  useMessagesScroll(controlRef);

  const delayedGetMessages = useDebouncedCallback(
    () => {
      dispatch(getMessagesThunk());
    },
    { wait: 300, incremental: true, incrementalAfter: 5 }
  );

  const cn = classNames(
    styles.messages,
    repliedMessage && styles.replying,
    isMessageEditing && styles.messageEditing,
    messages.length === 0 && styles.noMessages
  );

  useEffect(() => {
    if (chatId && prevChatIdRef.current !== chatId) {
      if (controlRef.current) {
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

  if (isChatLoading || !activeChat) {
    return (
      <div className={cn}>
        <MessagesLazy count={10} />
      </div>
    );
  }

  return (
    <InfinityScroll
      handleLoadMore={delayedGetMessages}
      isLoading={isMessagesLoading}
      isMore={!isMessagesEnded}
      ref={controlRef}
      loader={<MessagesLazy count={4} />}
      className={cn}
      isReversed
    >
      {messages.map((message: MessageInterface, i) => {
        const isNextDayMessage =
          messages[i + 1] && getIsNextDayMessage(message, messages[i + 1]);

        return (
          <div key={message.id}>
            <MessageMemo
              handleSelectMessage={handleSelectMessage}
              selectedMessage={selectedMessage}
              {...getMessageProps(message)}
              message={message}
            >
              <Message.Avatar userId={message.userId} avatar={message.avatar} />
              <Message.Body {...getBodyProps(message)}>
                <Message.Username {...getUsernameProps(message)} />
                <Message.Content>
                  <Message.Reply {...getReplyProps(message)} />
                  <Message.Text {...getTextProps(message)} />
                </Message.Content>
              </Message.Body>
              <Message.Select
                {...getSelectProps(message)}
                handleSelectMessage={handleSelectMessage}
                message={message}
                isMessageEditing={isMessageEditing}
                select={select}
              />
            </MessageMemo>
            {isNextDayMessage && (
              <Timestamp createdAt={messages[i + 1].createdAt} />
            )}
          </div>
        );
      })}
    </InfinityScroll>
  );
};
