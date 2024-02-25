import type { Message } from '@shared/api/interfaces';
import { getTime } from '@shared/helpers';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { setCurrentMessage, setIsMessageEditing } from '../../model';

export function useMessagesProps() {
  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector((state) => state.user.currentUser.id);

  const currentMessage = useAppSelector((state) => state.chat.currentMessage);
  const isMessageEditing = useAppSelector(
    (state) => state.chat.isMessageEditing
  );

  const getSelectProps = (message: Message) => {
    return {
      isSelectOpen: getIsSelectOpen(message, currentMessage),
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
    const repliedMessage = message.replied;
    const repliedMessageText = repliedMessage?.text;
    const isOwnReplied = getIsOwn(repliedMessage?.userId, currentUserId);

    return {
      // TODO: replied message should have its own name
      repliedUsername: isOwnReplied ? message.name : repliedMessage?.userId,
      repliedMessageText,
    };
  };

  const getBodyProps = (message: Message) => {
    const isOwn = getIsOwn(message.userId, currentUserId);
    const isEdited = getIsEdited(message);
    const isSelectOpen = getIsSelectOpen(message, currentMessage);

    return {
      isOwn,
      isEdited,
      isSelectOpen,
    };
  };

  const handleSelectMessage = (message: Message) => {
    if (isMessageEditing) {
      dispatch(setIsMessageEditing(false));
    }
    dispatch(setCurrentMessage(message));
  };

  return {
    handleSelectMessage,
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
