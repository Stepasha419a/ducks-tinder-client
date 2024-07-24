import type { FC } from 'react';
import { ChatList } from '@entities/chat';
import { useAppSelector, useAdaptiveMediaQuery } from '@shared/lib/hooks';
import { Choose, Loading, NoChats } from './ui';

export const IndexChatPage: FC = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);
  const chatsLength = useAppSelector((state) => state.chat.chats.length);
  const isFetched = useAppSelector((state) => state.chat.isFetched);

  if (isMobile) {
    return <ChatList currentUserId={currentUserId} />;
  }

  if (!chatsLength && isFetched) {
    return <NoChats />;
  }

  if (chatsLength > 0) {
    return <Choose />;
  }

  return <Loading />;
};
