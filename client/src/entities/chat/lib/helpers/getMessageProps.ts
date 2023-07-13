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

  const getContentProps = () => {
    const username = isOwn ? currentChatUserObj.name : chatMember?.name;

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
      isOwn,
      username,
      isSelectOpen,
      isMessageEditing: isMessageEditing && isSelectOpen,
      repliedMessageText,
      repliedUsername,
    };
  };

  return {
    getAvatarProps,
    getSelectProps,
    getContentProps,
  };
}
