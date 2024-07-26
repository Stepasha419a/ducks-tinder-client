import {
  blockChatThunk,
  selectBlockedActiveChat,
  unblockChatThunk,
} from '@entities/chat';
import { useAppDispatch, useAppSelector } from '@shared/lib';
import { Button } from '@shared/ui';
import styles from './BlockChat.module.scss';

export const BlockChat = () => {
  const dispatch = useAppDispatch();

  const { blocked, blockedById } = useAppSelector(selectBlockedActiveChat);
  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

  const isOwnBlocked = blockedById === currentUserId;

  const handleClick = () => {
    if (isOwnBlocked) {
      dispatch(unblockChatThunk());
    } else if (!blocked) {
      dispatch(blockChatThunk());
    }
  };

  if (blocked && !isOwnBlocked) {
    return null;
  }

  return (
    <Button onClick={handleClick} extraClassName={styles.btn}>
      {blocked ? 'Unblock' : 'Block'}
    </Button>
  );
};
