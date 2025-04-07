import type { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

const ChatPage: FC = (): ReactElement => {
  return <Outlet />;
};

export default ChatPage;
