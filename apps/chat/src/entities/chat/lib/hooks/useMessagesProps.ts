import { useUserStore } from '@ducks-tinder-client/auth';
import { getTime } from '@ducks-tinder-client/common';
import type { Message } from '@shared/api';
import { useChatSelector } from '@shared/lib/hooks';
import { t } from 'i18next';

export function useMessagesProps(selectedMessage: Message | null) {
  const userId = useUserStore((state) => state.currentUser?.id) || null;

  const isChatBlocked = useChatSelector(
    (state) => state.chat.activeChat?.blocked
  );

  const getMessageProps = (message: Message) => {
    return {
      isOwn: getIsOwn(message.userId, userId),
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
  });

  const getUsernameProps = (message: Message) => {
    const isOwn = getIsOwn(message.userId, userId);
    const username = message.name;

    return {
      isOwn,
      username,
    };
  };

  const getReplyProps = (message: Message) => {
    const isOwn = getIsOwn(message.userId, userId);
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
    const isOwn = getIsOwn(message.userId, userId);
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
  currentUserId: string | null
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
    ? `${t('edited', { ns: 'chat' })} ${getTime(
        new Date(message.updatedAt).toLocaleTimeString()
      )!.toString()}`
    : getTime(new Date(message.createdAt).toLocaleTimeString())!.toString();
}
