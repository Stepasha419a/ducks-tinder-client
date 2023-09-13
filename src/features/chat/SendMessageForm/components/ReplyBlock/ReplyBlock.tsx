import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import styles from './ReplyBlock.module.scss';
import { selectRepliedMessage, setRepliedMessage } from '@entities/chat/model';

export const ReplyBlock = () => {
  const dispatch = useAppDispatch();

  const repliedMessage = useAppSelector((state) => state.chat.repliedMessage);
  const { currentChatUserObj, currentChat } =
    useAppSelector(selectRepliedMessage);

  const chatRepliedMember = currentChat?.users.find(
    (user) => user.id === repliedMessage?.userId
  );
  const isOwnReplied = repliedMessage?.userId === currentChatUserObj.id;
  const repliedName = isOwnReplied
    ? currentChatUserObj.name
    : chatRepliedMember?.name;

  const handleCancelReplying = () => {
    dispatch(setRepliedMessage(null));
  };

  return (
    <div className={styles.reply}>
      <div className={styles.border} />
      <div className={styles.message}>
        <div className={styles.username}>{repliedName}</div>
        <div className={styles.text}>{repliedMessage!.text}</div>
      </div>
      <div onClick={handleCancelReplying} className={styles.close}>
        <div className={styles.mark} />
      </div>
    </div>
  );
};
