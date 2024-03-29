import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
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

  const bottomRef = useRef<null | HTMLDivElement>(null);
  const chatListRef = useRef<null | HTMLDivElement>(null);
  const lastScroll = useRef(0);

  const [isIntersecting, setIntersecting] = useState(false);
  const [isRequested, setRequested] = useState(false);

  const delayedGetChats = useDebouncedCallback(() => {
    dispatch(getChatsThunk());
  }, 300);

  useEffect(() => {
    dispatch(getChatsThunk());
    setRequested(true);
  }, [dispatch]);

  useEffect(() => {
    if (chatListRef.current && !isLoading) {
      chatListRef.current.scrollTop =
        chatListRef.current.scrollTop -
        (chatListRef.current.scrollTop - lastScroll.current);
      setRequested(false);
      setIntersecting(false);
    } else if (chatListRef.current && isLoading) {
      lastScroll.current = chatListRef.current.scrollTop;
    }
  }, [isLoading, lastScroll]);

  useEffect(() => {
    if (!isLoading && isIntersecting && !isRequested && !isEnded) {
      delayedGetChats();
      setRequested(true);
    }
  }, [delayedGetChats, isEnded, isIntersecting, isLoading, isRequested]);

  useEffect(() => {
    const child = bottomRef.current!;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(child);

    return () => observer.unobserve(child);
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
      <div ref={bottomRef}></div>
      {!isEnded && <ChatListLazy />}
    </div>
  );
};
