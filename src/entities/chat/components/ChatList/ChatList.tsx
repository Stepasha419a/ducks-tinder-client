import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from '@shared/lib/hooks';
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

  const isEnded = useAppSelector((state) => state.chat.isEnded);
  const { chats, currentChatId, isLoading } = useAppSelector(selectChatList);
  const chatsLength = chats.length;

  const chatListRef = useRef<null | HTMLDivElement>(null);

  const delayedGetChats = useDebouncedCallback(() => {
    dispatch(getChatsThunk());
  }, 300);

  useEffect(() => {
    delayedGetChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chatsLength && !isLoading) {
    return <FailedChats />;
  }

  return (
    <div className={styles.chats} ref={chatListRef}>
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
      {!isEnded && <ChatListLazy />}
    </div>
  );
};
