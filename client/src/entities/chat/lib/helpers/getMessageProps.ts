import { getTime } from '@shared/helpers';
import type { Message, Picture, ShortChat } from '@shared/api/interfaces';

interface CurrentChatUserObj {
  id: string;
  name: string;
  avatar: Picture | undefined;
}
// TODO: refactor it
export function getMessageProps(
  message: Message,
  currentMessage: Message | null,
  currentChat: ShortChat | undefined,
  currentChatUserObj: CurrentChatUserObj,
  isMessageEditing: boolean
) {
  const chatMember = currentChat?.users.find(
    (user) => user.id === message.userId
  );
  const isOwn = message.userId === currentChatUserObj.id;
  const isEdited = message.createdAt !== message.updatedAt;

  const isSelectOpen = currentMessage?.id === message.id;

  const getAvatarProps = () => ({
    avatar: isOwn
      ? currentChatUserObj.avatar?.name
      : chatMember?.pictures[0]?.name,
    userId: message.userId,
  });

  const getSelectProps = () => ({
    isSelectOpen,
  });

  const getTextProps = () => {
    const time = isEdited
      ? `edited ${getTime(
          new Date(message.updatedAt).toLocaleTimeString()
        )!.toString()}`
      : getTime(new Date(message.createdAt).toLocaleTimeString())!.toString();

    return {
      time,
      text: message.text,
      isEdited,
    };
  };

  const getUsernameProps = () => {
    const username = isOwn ? currentChatUserObj.name : chatMember?.name;

    return {
      isOwn,
      username,
    };
  };

  const getReplyProps = () => {
    const repliedMessage = message.replied;
    const repliedMessageText = repliedMessage?.text;
    const isOwnReplied = repliedMessage?.userId === currentChatUserObj.id;
    const repliedUser = currentChat?.users.find(
      (user) => user.id === repliedMessage?.userId
    );
    const repliedUsername =
      repliedMessage && isOwnReplied
        ? currentChatUserObj.name
        : repliedUser?.name;

    return {
      repliedUsername,
      repliedMessageText,
    };
  };

  const getBodyProps = () => ({
    isOwn,
    isEdited,
    isSelectOpen,
    isMessageEditing: isMessageEditing && isSelectOpen,
  });

  return {
    getAvatarProps,
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
    getSelectProps,
  };
}
