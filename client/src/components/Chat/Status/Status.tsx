import { useAppSelector } from '../../../redux/store';
import Choose from './Choose/Choose';
import FailedChats from './Failed/NoChats';

const Status = () => {
  const chats = useAppSelector((state) => state.chatPage.chats);
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const isConnected = useAppSelector((state) => state.chatPage.isConnected);

  if (!currentUser.chats.length) {
    return <FailedChats />;
  }

  return chats.length ? <Choose isConnected={isConnected} /> : <></>;
};

export default Status;