import type { FC, ReactElement } from 'react';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/hooks';
import { selectMessages, selectUserChat } from '@entities/chat/model';
import { getMessageProps } from '@entities/chat/lib';
import { getIsNextDayMessage } from '@entities/chat/lib/helpers';
import { Message } from './components';
import { MessagesLazy } from './MessageList.lazy';
import styles from './MessageList.module.scss';

interface MessagesProps {
  select: ReactElement;
  edit: ReactElement;
  handleSelectMessage: (message: MessageInterface) => void;
}

export const MessageList: FC<MessagesProps> = ({
  select,
  edit,
  handleSelectMessage,
}) => {
  const { messagesLength, isMessagesInitialLoading, maxMessagesCount } =
    useAppSelector(selectMessages);
  const { currentChatUserObj, messages, currentChat } =
    useAppSelector(selectUserChat);
  const currentMessage = useAppSelector((state) => state.chat.currentMessage);
  const isMessageEditing = useAppSelector(
    (state) => state.chat.isMessageEditing
  );

  if (isMessagesInitialLoading) {
    return <MessagesLazy />;
  }

  return (
    <>
      {maxMessagesCount > messagesLength && <MessagesLazy count={4} />}
      {messages.map((message: MessageInterface, i) => {
        const {
          getAvatarProps,
          getSelectProps,
          getBodyProps,
          getUsernameProps,
          getReplyProps,
          getTextProps,
        } = getMessageProps(
          message,
          currentMessage,
          currentChat,
          currentChatUserObj,
          isMessageEditing
        );

        const isSelectOpen = currentMessage?.id === message.id;

        return (
          <>
            <Message key={message.id}>
              <Message.Avatar {...getAvatarProps()} />
              <Message.Body {...getBodyProps()}>
                <Message.Username {...getUsernameProps()} />
                {isSelectOpen && isMessageEditing ? (
                  edit
                ) : (
                  <Message.Content>
                    <Message.Reply {...getReplyProps()} />
                    <Message.Text {...getTextProps()} />
                  </Message.Content>
                )}
              </Message.Body>
              {isSelectOpen ? (
                select
              ) : (
                <Message.Select
                  handleSelectMessage={() => handleSelectMessage(message)}
                  {...getSelectProps()}
                />
              )}
            </Message>
            {messages[i + 1] &&
              getIsNextDayMessage(message, messages[i + 1]) && (
                <div className={styles.date} key={`${messages[i + 1].id}_date`}>
                  {new Date(messages[i + 1].createdAt).toLocaleDateString()}
                  <div className={styles.border}></div>
                </div>
              )}
          </>
        );
      })}
    </>
  );
};
