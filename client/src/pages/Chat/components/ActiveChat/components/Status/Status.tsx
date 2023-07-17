import type { FC } from 'react';
import { useAppSelector } from '@hooks';
import NotFoundChats from './NotFound/NotFound';
import FailedChats from './Failed/NoChats';

export const Status: FC = () => {
  const chats = useAppSelector((state) => state.chat.chats);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isNotFound = useAppSelector((state) => state.chat.isNotFound);

  if (!chats.length && !isLoading) {
    return <FailedChats />;
  }

  if (isNotFound) {
    return <NotFoundChats />;
  }

  return <></>;
};
