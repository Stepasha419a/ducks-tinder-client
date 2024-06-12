import type { FC } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import NotFoundChats from './NotFound/NotFound';
import FailedChats from './Failed/NoChats';

export const Status: FC = () => {
  const chats = useAppSelector((state) => state.chat.chats);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isNotFound = useAppSelector((state) => state.chat.isNotFound);
  const isSocketConnected = useAppSelector(
    (state) => state.chat.isSocketConnected
  );

  if (!chats.length && !isLoading && isSocketConnected) {
    return <FailedChats />;
  }

  if (isNotFound) {
    return <NotFoundChats />;
  }

  return <></>;
};
