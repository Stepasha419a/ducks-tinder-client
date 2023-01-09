import { useAppSelector } from '../../../redux/reduxStore';
import Choose from './Choose/Choose';
import FailedChats from './Failed/NoChats';

const Status = () => {
  const chats = useAppSelector((state) => state.chatPage.chats);
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  if (!currentUser.chats.length) {
    return <FailedChats />;
  }

  return chats.length ? <Choose /> : <></>;
};

export default Status;