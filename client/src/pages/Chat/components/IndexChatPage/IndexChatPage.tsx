import { useMediaQuery } from '@shared/lib/hooks';
import type { FC } from 'react';
import { Choose } from './components';
import { ChatList } from '@entities/chat/components';

export const IndexChatPage: FC = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <ChatList />;
  }

  return <Choose />;
};
