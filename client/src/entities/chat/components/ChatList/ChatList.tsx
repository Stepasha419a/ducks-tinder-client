import type { FC, ReactElement } from 'react';
import { useEffect } from 'react';
import type { Chat } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getChatsThunk } from '@entities/chat/model';
import { Preloader } from '@shared/ui';
import FailedChats from './Failed/FailedChats';
import styles from './ChatList.module.scss';
import { ChatItem } from './ChatItem/ChatItem';

interface ChatListProps {
  connect(chatId: string): void;
}

export const ChatList: FC<ChatListProps> = ({ connect }): ReactElement => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const chats = useAppSelector((state) => state.chat.chats);
  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const chatsUsers = useAppSelector((state) => state.chat.chatsUsers);
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  useEffect(() => {
    dispatch(getChatsThunk(currentUser._id));
  }, [currentUser._id, currentUser.chats.length, chats.length, dispatch]);

  if (!currentUser.chats.length) {
    return <FailedChats />;
  }

  if (!chats.length || isLoading) {
    return <Preloader />;
  }

  return (
    <div className={styles.chats}>
      {chats.map((chat: Chat) => {
        const chatCompanionId = chat.members.find(
          (member) => member !== currentUser._id
        );
        const chatCompanion = chatsUsers.find(
          (user) => user._id === chatCompanionId
        );
        const isActive = currentChatId === chat._id;
        return (
          <ChatItem
            key={chat._id}
            chat={chat}
            chatCompanion={chatCompanion}
            isActive={isActive}
            connect={connect}
          />
        );
      })}
    </div>
  );
};
