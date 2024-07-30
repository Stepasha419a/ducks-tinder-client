import { blockChatThunk, unblockChatThunk } from '@entities/chat';
import { useAppDispatch, useAppSelector } from '@shared/lib';
import { Button } from '@shared/ui';
import styles from './BlockChat.module.scss';

export const BlockChat = () => {
  const dispatch = useAppDispatch();

  const chat = useAppSelector((state) => state.chat.chat);
  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

  if (!chat) {
    return null;
  }

  const isOwnBlocked = chat.blockedById === currentUserId;

  const handleClick = () => {
    if (isOwnBlocked) {
      dispatch(unblockChatThunk());
    } else if (!chat.blocked) {
      dispatch(blockChatThunk());
    }
  };

  if (chat.blocked && !isOwnBlocked) {
    return null;
  }

  return (
    <Button onClick={handleClick} extraClassName={styles.btn}>
      {chat.blocked ? 'Unblock' : 'Block'}
    </Button>
  );
};
