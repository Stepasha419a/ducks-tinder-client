import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from '@hooks';
import { closeAllSocketsThunk } from '@entities/chat/model';
import { ChatList } from '@entities/chat/components';

export const OpenChatList = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(closeAllSocketsThunk());
    };
  }, [dispatch]);

  return <ChatList />;
};
