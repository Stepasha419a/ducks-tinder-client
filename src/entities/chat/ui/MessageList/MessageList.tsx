import classNames from 'classnames';
import { useEffect, useRef, type FC, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import {
  connectChatThunk,
  disconnectChatThunk,
  getMessagesThunk,
  selectMessages,
} from '@entities/chat';
import { useMessagesProps, useMessagesScroll } from '@entities/chat';
import { getIsNextDayMessage } from '@entities/chat';
import type { Message as MessageInterface } from '@shared/api';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from '@shared/lib';
import { InfinityScroll } from '@shared/ui';
import type { ControlRef } from '@shared/ui';
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
  const chat = useAppSelector((state) => state.chat.chat);
  const currentChatId = useAppSelector((state) => state.chat.currentChatId);

  const prevChatIdRef = useRef<string | null>(null);

  const {
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

  if (isChatLoading || !chat || !currentChatId) {
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
