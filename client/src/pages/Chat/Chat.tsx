import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import { Messages } from '@entities/chat/components';
import { ChatForm } from '@features/chat';
import { Status } from './components';

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
