import {
  blockChatThunk,
  unblockChatThunk,
  useAppDispatch,
  useAppSelector,
} from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';

import * as styles from './BlockChat.module.scss';

export const BlockChat = () => {
  const dispatch = useAppDispatch();

  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

  if (!activeChat) {
    return null;
  }

  const isOwnBlocked = activeChat.blockedById === currentUserId;

  const handleClick = () => {
    if (isOwnBlocked) {
      dispatch(unblockChatThunk());
    } else if (!activeChat.blocked) {
      dispatch(blockChatThunk());
    }
  };

  if (activeChat.blocked && !isOwnBlocked) {
    return null;
  }

  return (
    <Button onClick={handleClick} extraClassName={styles.btn}>
      {activeChat.blocked ? 'Unblock' : 'Block'}
    </Button>
  );
};
