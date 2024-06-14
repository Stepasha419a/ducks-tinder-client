import type { FC } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import { NoChats, NotFoundChat } from './ui';

export const Status: FC = () => {
  const chats = useAppSelector((state) => state.chat.chats);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isNotFound = useAppSelector((state) => state.chat.isNotFound);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );

  if (!chats.length && !isLoading && isSocketConnected) {
    return <NoChats />;
  }

  if (isNotFound) {
    return <NotFoundChat />;
  }

  return null;
};
