import type { FC } from 'react';
import { useRef } from 'react';

import { getChatsThunk, selectChatList , useAppDispatch, useAppSelector,useDebouncedCallback  } from '@ducks-tinder-client/common';
import { InfinityScroll } from '@ducks-tinder-client/ui';

import { ChatListLazy } from './ChatList.lazy';
import { ChatItem, FailedChats } from './components';
import styles from './ChatList.module.scss';






interface ChatListProps {
  currentUserId: string;
}

export const ChatList: FC<ChatListProps> = ({ currentUserId }) => {
  const dispatch = useAppDispatch();

  const isEnded = useAppSelector((state) => state.chat.isEnded);
  const { chats, activeChat, isLoading } = useAppSelector(selectChatList);
  const chatsLength = chats.length;

  const chatListRef = useRef<null | HTMLDivElement>(null);

  const delayedGetChats = useDebouncedCallback(
    () => {
      dispatch(getChatsThunk());
    },
    { wait: 1000, incremental: true, incrementalAfter: 5, initialWait: 0 }
  );

  if (!chatsLength && isEnded) {
    return <FailedChats />;
  }

  return (
    <div className={styles.chats} ref={chatListRef}>
      <InfinityScroll
        handleLoadMore={delayedGetChats}
        isLoading={isLoading}
        isMore={!isEnded}
        loader={<ChatListLazy />}
      >
        {chats.map((chat) => {
          const isActive = activeChat?.id === chat.id;
          return (
            <ChatItem
              currentUserId={currentUserId}
              key={chat.id}
              chat={chat}
              isActive={isActive}
            />
          );
        })}
      </InfinityScroll>
    </div>
  );
};
