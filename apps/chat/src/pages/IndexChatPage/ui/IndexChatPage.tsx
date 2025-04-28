import type { FC } from 'react';

import {
  useAdaptiveMediaQuery,
  useAppSelector,
} from '@ducks-tinder-client/common';

import { ChatList } from '@entities/chat';

import { Choose, Loading, NoChats } from './components';

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
