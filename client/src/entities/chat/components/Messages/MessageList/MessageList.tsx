import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import type { Message as MessageInterface } from '@/shared/api/interfaces';
import { useAppSelector } from '@/shared/hooks';
import { selectUserChat } from '@/entities/chat/model';
import { getMessageProps } from '@entities/chat/lib';
import { Message } from './Message/Message';
import { getIsNextDayMessage } from '@/entities/chat/lib/helpers';
import styles from './MessageList.module.scss';

interface MessagesProps {
  select: ReactElement;
  currentMessage: MessageInterface | null;
  isMessageEditing: boolean;
  editingValue: string;
  setEditingValue: Dispatch<SetStateAction<string>>;
  handleSelectMessage: (message: MessageInterface) => void;
}

export const MessageList: FC<MessagesProps> = ({
  select,
  currentMessage,
  isMessageEditing,
  editingValue,
  setEditingValue,
  handleSelectMessage,
}) => {
  const { currentChatUserObj, messages, currentChat } =
    useAppSelector(selectUserChat);

  return (
    <>
      {messages.map((message: MessageInterface, i) => {
        const { getAvatarProps, getSelectProps, getContentProps } =
          getMessageProps(
            message,
            currentMessage,
            currentChat,
            currentChatUserObj,
            isMessageEditing
          );

        return (
          <>
            <Message key={message.id}>
              <Message.Avatar {...getAvatarProps()} />
              <Message.Content
                editingValue={editingValue}
                setEditingValue={setEditingValue}
                text={message.text}
                createdAt={message.createdAt}
                updatedAt={message.updatedAt}
                {...getContentProps()}
              />
              <Message.Select
                handleSelectMessage={() => handleSelectMessage(message)}
                select={select}
                {...getSelectProps()}
              />
            </Message>
            {messages[i + 1] &&
              getIsNextDayMessage(message, messages[i + 1]) && (
                <div className={styles.date}>
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
