import type { Dispatch, SetStateAction } from 'react';
import type { Message } from '@shared/api/interfaces';
import { getTime } from '@shared/helpers';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { setCurrentMessage, setIsMessageEditing } from '../../model';

export function useMessagesProps(
  setEditingValue: Dispatch<SetStateAction<string>>
) {
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
    const isOwn = message.userId === currentUserId;
    const chatMember = currentChat?.users.find(
      (user) => user.id === message.userId
    );

    return {
      avatar: isOwn ? avatarName : chatMember?.pictures[0]?.name,
      userId: message.userId,
    };
  };

  const getSelectProps = (message: Message) => {
    const isSelectOpen = currentMessage?.id === message.id;

    return {
      isSelectOpen,
    };
  };

  const getTextProps = (message: Message) => {
    const isEdited = message.createdAt !== message.updatedAt;

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

  const getUsernameProps = (message: Message) => {
    const isOwn = message.userId === currentUserId;
    const chatMember = currentChat?.users.find(
      (user) => user.id === message.userId
    );
    const username = isOwn ? currentUserName : chatMember?.name;

    return {
      isOwn,
      username,
    };
  };

  const getReplyProps = (message: Message) => {
    const repliedMessage = message.replied;
    const repliedMessageText = repliedMessage?.text;
    const isOwnReplied = repliedMessage?.userId === currentUserId;
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
    const isOwn = message.userId === currentUserId;
    const isSelectOpen = currentMessage?.id === message.id;
    const isEdited = message.createdAt !== message.updatedAt;

    return {
      isOwn,
      isEdited,
      isSelectOpen,
      isMessageEditing: isMessageEditing && isSelectOpen,
    };
  };

  const handleSelectMessage = (message: Message) => {
    setEditingValue(message.text);
    dispatch(setIsMessageEditing(false));
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
