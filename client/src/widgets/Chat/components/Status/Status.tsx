import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import Choose from './Choose/Choose';
//import FailedChats from './Failed/NoChats';

export const Status = (): ReactElement => {
  const chats = useAppSelector((state) => state.chat.chats);
  //const currentUser = useAppSelector((state) => state.user.currentUser);
  const isConnected = useAppSelector((state) => state.chat.isConnected);

  /* if (!currentUser.chats.length) {
    return <FailedChats />;
  } */

  return chats.length ? <Choose isConnected={isConnected} /> : <></>;
};
