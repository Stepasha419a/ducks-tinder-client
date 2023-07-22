import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib/hooks';
import { disconnectChatThunk } from '@entities/chat/model';
import { ChatList } from '@entities/chat/components';

export const OpenChatList = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(disconnectChatThunk());
    };
  }, [dispatch]);

  return <ChatList />;
};
