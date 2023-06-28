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
  currentChatUserObj: CurrentChatUserObj
) {
  const chatMember = currentChat?.users.find(
    (user) => user.id === message.userId
  );
  const isOwn = message.userId === currentChatUserObj.id;
  const name = isOwn ? currentChatUserObj.name : chatMember!.name;
  const avatar = isOwn
    ? currentChatUserObj.avatar?.name
    : chatMember!.pictures[0]?.name;
  const isSelectOpen = currentMessage?.id === message.id;

  const repliedMessage = message.replied;
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
    name,
    avatar,
    isSelectOpen,
    repliedMessage,
    repliedUsername,
  };
}
