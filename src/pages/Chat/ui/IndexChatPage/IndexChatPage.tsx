import type { FC } from 'react';
import { ChatList } from '@entities/chat';
import { useAppSelector, useAdaptiveMediaQuery } from '@shared/lib/hooks';
import { Choose } from './ui';

export const IndexChatPage: FC = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

  if (isMobile) {
    return <ChatList currentUserId={currentUserId} />;
  }

  return <Choose />;
};
