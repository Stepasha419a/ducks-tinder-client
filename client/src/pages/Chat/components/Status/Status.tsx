import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import Choose from './Choose/Choose';
import FailedChats from './Failed/NoChats';
import NotFoundChats from './NotFound/NotFound';

export const Status = (): ReactElement => {
  const chats = useAppSelector((state) => state.chat.chats);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isConnected = useAppSelector((state) => state.chat.isConnected);
  const isNotFound = useAppSelector((state) => state.chat.isNotFound);

  if (!chats.length && !isLoading) {
    return <FailedChats />;
  }

  if (isNotFound) {
    return <NotFoundChats />;
  }

  return !isConnected ? <Choose /> : <></>;
};
