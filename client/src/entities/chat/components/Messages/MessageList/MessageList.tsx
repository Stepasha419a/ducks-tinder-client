import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import type { Message as MessageInterface } from '@/shared/api/interfaces';
import { useAppSelector } from '@/shared/hooks';
import { selectUserChat } from '@/entities/chat/model';
import { getMessageProps } from '@entities/chat/lib';
import { Message } from './Message/Message';

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
      {messages.map((message: MessageInterface) => {
        const { getAvatarProps, getSelectProps, getContentProps } =
          getMessageProps(
            message,
            currentMessage,
            currentChat,
            currentChatUserObj,
            isMessageEditing
          );

        return (
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
        );
      })}
    </>
  );
};
