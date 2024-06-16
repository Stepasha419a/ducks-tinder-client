import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Dispatch, FC, SetStateAction } from 'react';
import type { Message } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/lib/hooks';
import styles from './ReplyBlock.module.scss';

interface ReplyBlockProps {
  repliedMessage: Message;
  setRepliedMessage: Dispatch<SetStateAction<Message | null>>;
}

export const ReplyBlock: FC<ReplyBlockProps> = ({
  repliedMessage,
  setRepliedMessage,
}) => {
  const currentUserId = useAppSelector((state) => state.user.currentUser?.id);

  const isOwnReplied = repliedMessage.userId === currentUserId;
  const repliedName = isOwnReplied ? repliedMessage.name : repliedMessage.name;

  return (
    <div className={styles.reply}>
      <div className={styles.border} />
      <div className={styles.message}>
        <div className={styles.username}>{repliedName}</div>
        <div className={styles.text}>{repliedMessage.text}</div>
      </div>

      <div onClick={() => setRepliedMessage(null)} className={styles.close}>
        <FontAwesomeIcon className={styles.icon} icon={faXmark} />
      </div>
    </div>
  );
};
