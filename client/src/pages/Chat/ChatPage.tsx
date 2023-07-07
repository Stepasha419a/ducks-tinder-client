import type { FC, ReactElement } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Choose from './components/Choose/Choose';

const ChatPage: FC = (): ReactElement => {
  const params = useParams<'chatId'>() as { chatId: string | undefined };

  return <>{params.chatId ? <Outlet /> : <Choose />}</>;
};

export default ChatPage;
