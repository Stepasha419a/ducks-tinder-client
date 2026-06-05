import type { FC } from 'react';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { ChatList } from '@entities/chat';

import { Choose, Loading, NoChats } from './components';
import { useChatSelector } from '@shared/lib/hooks';
import { useUserStore } from '@ducks-tinder-client/auth';

export const IndexChatPage: FC = () => {
  const userId = useUserStore((state) => state.currentUser?.id);

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const chatsLength = useChatSelector((state) => state.chat.chats.length);
  const isFetched = useChatSelector((state) => state.chat.isFetched);

  if (!userId) {
    return null;
  }

  if (isMobile) {
    return <ChatList currentUserId={userId} />;
  }

  if (!chatsLength && isFetched) {
    return <NoChats />;
  }

  if (chatsLength > 0) {
    return <Choose />;
  }

  return <Loading />;
};
