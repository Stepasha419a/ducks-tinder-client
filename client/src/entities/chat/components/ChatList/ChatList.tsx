import type { FC, ReactElement } from 'react';
import { useEffect } from 'react';
import type { ChatWithUsers } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getChatsThunk, selectChatList } from '@entities/chat/model';
import { Preloader } from '@shared/ui';
import FailedChats from './Failed/FailedChats';
import { ChatItem } from './ChatItem/ChatItem';
import { selectUserChatsInfo } from '@entities/user/model';
import styles from './ChatList.module.scss';

interface ChatListProps {
  connect(chatId: string): void;
}

export const ChatList: FC<ChatListProps> = ({ connect }): ReactElement => {
  const dispatch = useAppDispatch();

  const { currentUserId, chatsLength } = useAppSelector(selectUserChatsInfo);
  const { chats, currentChatId, isLoading } = useAppSelector(selectChatList);

  useEffect(() => {
    dispatch(getChatsThunk(currentUserId));
  }, [currentUserId, chatsLength, chats.length, dispatch]);

  if (!chatsLength) {
    return <FailedChats />;
  }

  if (!chats.length || isLoading) {
    return <Preloader />;
  }

  return (
    <div className={styles.chats}>
      {chats.map((chat: ChatWithUsers) => {
        const chatCompanion = chat.members.find(
          (member) => member._id !== currentUserId
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
