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
        const { name, isOwn, avatar, isSelectOpen } = getMessageProps(
          message,
          currentMessage,
          currentChat,
          currentChatUserObj
        );

        return (
          <Message key={message.id} message={message} avatar={avatar}>
            <Message.Content
              isOwn={isOwn}
              editingValue={editingValue}
              setEditingValue={setEditingValue}
              text={message.text}
              isMessageEditing={isSelectOpen && isMessageEditing}
              isSelectOpen={isSelectOpen}
              username={name}
              createdAt={message.createdAt}
              updatedAt={message.updatedAt}
            />
            <Message.Select
              isSelectOpen={isSelectOpen}
              handleSelectMessage={() => handleSelectMessage(message)}
              isOwn={isOwn}
              select={select}
            />
          </Message>
        );
      })}
    </>
  );
};