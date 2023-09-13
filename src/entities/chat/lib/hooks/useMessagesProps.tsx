import type { Message, ShortChat } from '@shared/api/interfaces';
import { getTime } from '@shared/helpers';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { setCurrentMessage, setIsMessageEditing } from '../../model';

export function useMessagesProps() {
  const dispatch = useAppDispatch();

  const chats = useAppSelector((state) => state.chat.chats);
  const avatarName = useAppSelector(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (state) => state.user.currentUser.pictures?.[0]?.name
  );
  const currentUserId = useAppSelector((state) => state.user.currentUser.id);
  const currentUserName = useAppSelector(
    (state) => state.user.currentUser.name
  );

  const currentMessage = useAppSelector((state) => state.chat.currentMessage);
  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const isMessageEditing = useAppSelector(
    (state) => state.chat.isMessageEditing
  );

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const getAvatarProps = (message: Message) => {
    const chatMember = getChatMember(currentChat, message);

    return {
      avatar: getIsOwn(message.userId, currentUserId)
        ? avatarName
        : chatMember?.pictures[0]?.name,
      userId: message.userId,
    };
  };

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
    const chatMember = getChatMember(currentChat, message);
    const username = isOwn ? currentUserName : chatMember?.name;

    return {
      isOwn,
      username,
    };
  };

  const getReplyProps = (message: Message) => {
    const repliedMessage = message.replied;
    const repliedMessageText = repliedMessage?.text;
    const isOwnReplied = getIsOwn(repliedMessage?.userId, currentUserId);
    const repliedUser = currentChat?.users.find(
      (user) => user.id === repliedMessage?.userId
    );
    const repliedUsername =
      repliedMessage && isOwnReplied ? currentUserName : repliedUser?.name;

    return {
      repliedUsername,
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
    getAvatarProps,
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

function getChatMember(currentChat: ShortChat | undefined, message: Message) {
  return currentChat?.users.find((user) => user.id === message.userId);
}

function getMessageTime(message: Message) {
  return getIsEdited(message)
    ? `edited ${getTime(
        new Date(message.updatedAt).toLocaleTimeString()
      )!.toString()}`
    : getTime(new Date(message.createdAt).toLocaleTimeString())!.toString();
}
