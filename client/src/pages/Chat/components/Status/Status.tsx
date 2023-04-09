import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import Choose from './Choose/Choose';
import FailedChats from './Failed/NoChats';

export const Status = (): ReactElement => {
  const chats = useAppSelector((state) => state.chatPage.chats);
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const isConnected = useAppSelector((state) => state.chatPage.isConnected);

  if (!currentUser.chats.length) {
    return <FailedChats />;
  }

  return chats.length ? <Choose isConnected={isConnected} /> : <></>;
};
