import type { Message } from '@shared/api';
import { getTime } from '@shared/lib';
import { useAppSelector } from '@shared/lib';

export function useMessagesProps(selectedMessage: Message | null) {
  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);
  const isChatBlocked = useAppSelector(
    (state) => state.chat.activeChat?.blocked
  );

  const getMessageProps = (message: Message) => {
    return {
      isOwn: getIsOwn(message.userId, currentUserId),
    };
  };

  const getSelectProps = (message: Message) => {
    return {
      isSelectOpen: getIsSelectOpen(message, selectedMessage),
      isChatBlocked,
    };
  };

  const getTextProps = (message: Message) => ({
    time: getMessageTime(message),
    text: message.text,
    isEdited: getIsEdited(message),
  });

  const getUsernameProps = (message: Message) => {
    const isOwn = getIsOwn(message.userId, currentUserId);
    const username = message.name;

    return {
      isOwn,
      username,
    };
  };

  const getReplyProps = (message: Message) => {
    const isOwn = getIsOwn(message.userId, currentUserId);
    const repliedMessage = message.replied;
    const repliedMessageText = repliedMessage?.text;
    const repliedMessageName = repliedMessage?.name;

    return {
      repliedUsername: repliedMessageName,
      repliedMessageText,
      isOwn,
    };
  };

  const getBodyProps = (message: Message) => {
    const isOwn = getIsOwn(message.userId, currentUserId);
    const isEdited = getIsEdited(message);
    const isSelectOpen = getIsSelectOpen(message, selectedMessage);
    const isReplied = !!message.replied;

    return {
      isOwn,
      isEdited,
      isSelectOpen,
      isReplied,
    };
  };

  return {
    getMessageProps,
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
    getSelectProps,
  };
}

function getIsOwn(
  messageUserId: string | undefined,
  currentUserId: string
): boolean {
  return messageUserId === currentUserId;
}

function getIsEdited(message: Message) {
  return message.createdAt !== message.updatedAt;
}

function getIsSelectOpen(message: Message, currentMessage: Message | null) {
  return message.id === currentMessage?.id;
}

function getMessageTime(message: Message) {
  return getIsEdited(message)
    ? `edited ${getTime(
        new Date(message.updatedAt).toLocaleTimeString()
      )!.toString()}`
    : getTime(new Date(message.createdAt).toLocaleTimeString())!.toString();
}
