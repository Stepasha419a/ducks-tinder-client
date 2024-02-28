import type { FC } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { getChatsThunk, selectChatList } from '@entities/chat/model';
import FailedChats from './Failed/FailedChats';
import { ChatItem } from './ChatItem/ChatItem';
import styles from './ChatList.module.scss';
import { ChatListLazy } from './ChatList.lazy';

interface ChatListProps {
  currentUserId: string;
}

export const ChatList: FC<ChatListProps> = ({ currentUserId }) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const { chats, currentChatId } = useAppSelector(selectChatList);
  const chatsLength = chats.length;

  useEffect(() => {
    dispatch(getChatsThunk());
  }, [dispatch]);

  if (isLoading) {
    return <ChatListLazy />;
  }

  if (!chatsLength) {
    return <FailedChats />;
  }

  return (
    <div className={styles.chats}>
      {chats.map((chat) => {
        const isActive = currentChatId === chat.id;
        return (
          <ChatItem
            currentUserId={currentUserId}
            key={chat.id}
            chat={chat}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};
