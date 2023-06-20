import type { FC, ReactElement } from 'react';
import { useEffect } from 'react';
import type { ShortChat } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getChatsThunk, selectChatList } from '@entities/chat/model';
import FailedChats from './Failed/FailedChats';
import { ChatItem } from './ChatItem/ChatItem';
import styles from './ChatList.module.scss';
import { ChatListLazy } from './ChatList.lazy';

interface ChatListProps {
  connect(chatId: string): void;
}

export const ChatList: FC<ChatListProps> = ({ connect }): ReactElement => {
  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector((state) => state.user.currentUser.id);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const { chats, currentChatId } = useAppSelector(selectChatList);
  const chatsLength = chats.length;

  useEffect(() => {
    dispatch(getChatsThunk());
  }, [currentUserId, chatsLength, chats.length, dispatch]);

  if (isLoading) {
    return <ChatListLazy />;
  }

  if (!chatsLength) {
    return <FailedChats />;
  }

  return (
    <div className={styles.chats}>
      {chats.map((chat: ShortChat) => {
        const chatCompanion = chat.users.find(
          (user) => user.id !== currentUserId
        );
        const isActive = currentChatId === chat.id;
        return (
          <ChatItem
            key={chat.id}
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
