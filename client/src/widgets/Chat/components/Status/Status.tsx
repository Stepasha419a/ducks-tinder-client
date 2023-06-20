import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import Choose from './Choose/Choose';
import FailedChats from './Failed/NoChats';

export const Status = (): ReactElement => {
  const chats = useAppSelector((state) => state.chat.chats);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isConnected = useAppSelector((state) => state.chat.isConnected);

  if (!chats.length && !isLoading) {
    return <FailedChats />;
  }

  return !isConnected ? <Choose /> : <></>;
};
