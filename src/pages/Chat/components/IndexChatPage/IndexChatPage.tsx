import type { FC } from 'react';
import { ChatList } from '@entities/chat';
import { useAppSelector, useMediaQuery } from '@shared/lib/hooks';
import { Choose } from './components';

export const IndexChatPage: FC = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

  if (isMobile) {
    return <ChatList currentUserId={currentUserId} />;
  }

  return <Choose />;
};
