import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import { ChatForm, Messages, Status } from './components';

export const Chat = (): ReactElement => {
  const isConnected = useAppSelector((state) => state.chat.isConnected);

  return (
    <>
      <Status />
      {isConnected && (
        <>
          <Messages />
          <ChatForm />
        </>
      )}
    </>
  );
};
