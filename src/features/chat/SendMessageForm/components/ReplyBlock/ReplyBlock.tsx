import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import styles from './ReplyBlock.module.scss';
import { setRepliedMessage } from '@entities/chat/model';

export const ReplyBlock = () => {
  const dispatch = useAppDispatch();

  const repliedMessage = useAppSelector((state) => state.chat.repliedMessage);
  const currentUserId = useAppSelector((state) => state.user.currentUser?.id);

  if (!repliedMessage) {
    return null;
  }

  const isOwnReplied = repliedMessage.userId === currentUserId;
  const repliedName = isOwnReplied ? repliedMessage.name : repliedMessage.name;

  const handleCancelReplying = () => {
    dispatch(setRepliedMessage(null));
  };

  return (
    <div className={styles.reply}>
      <div className={styles.border} />
      <div className={styles.message}>
        <div className={styles.username}>{repliedName}</div>
        <div className={styles.text}>{repliedMessage.text}</div>
      </div>
      <div onClick={handleCancelReplying} className={styles.close}>
        <div className={styles.mark} />
      </div>
    </div>
  );
};
