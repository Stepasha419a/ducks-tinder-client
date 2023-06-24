import type { Message, Picture, ShortChat } from '@shared/api/interfaces';

interface CurrentChatUserObj {
  _id: string;
  name: string;
  avatar: Picture | undefined;
}

export function getMessageProps(
  message: Message,
  currentMessage: Message | null,
  currentChat: ShortChat | undefined,
  currentChatUserObj: CurrentChatUserObj
) {
  const chatMember = currentChat?.users.find(
    (user) => user.id === message.userId
  );
  const isOwn = message.userId === currentChatUserObj._id;
  const name = isOwn ? currentChatUserObj.name : chatMember!.name;
  const avatar = isOwn
    ? currentChatUserObj.avatar?.name
    : chatMember!.pictures[0]?.name;
  const isSelectOpen = currentMessage?.id === message.id;

  return { isOwn, name, avatar, isSelectOpen };
}
