import type { FC } from 'react';
import { ChatList } from '@entities/chat';
import { useAppSelector, useAdaptiveMediaQuery } from '@shared/lib/hooks';
import { Choose, Loading, NoChats } from './ui';

export const IndexChatPage: FC = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);
  const chatsLength = useAppSelector((state) => state.chat.chats.length);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );
  const newMessagesCount = useAppSelector(
    (state) => state.chat.newMessagesCount
  );

  if (isMobile) {
    return <ChatList currentUserId={currentUserId} />;
  }

  if (!chatsLength && isSocketConnected && newMessagesCount !== null) {
    return <NoChats />;
  }

  if (chatsLength > 0) {
    return <Choose />;
  }

  return <Loading />;
};
