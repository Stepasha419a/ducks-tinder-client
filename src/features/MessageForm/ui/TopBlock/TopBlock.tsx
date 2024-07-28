import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { FC } from 'react';
import type { Message } from '@shared/api';
import { useAppSelector } from '@shared/lib';
import styles from './TopBlock.module.scss';

interface TopBlockProps {
  repliedMessage: Message | null;
  selectedMessage: Message | null;
  cancelTopBlock: () => void;
  isMessageEditing: boolean;
}

export const TopBlock: FC<TopBlockProps> = ({
  repliedMessage,
  selectedMessage,
  cancelTopBlock,
  isMessageEditing,
}) => {
  const currentUserId = useAppSelector((state) => state.user.currentUser?.id);

  const isOwnReplied = repliedMessage?.userId === currentUserId;
  const repliedName = isOwnReplied
    ? repliedMessage?.name
    : repliedMessage?.name;

  const title = isMessageEditing ? 'Editing' : repliedName;
  const text = isMessageEditing ? selectedMessage?.text : repliedMessage?.text;

  return (
    <div className={styles.block}>
      {repliedMessage && <div className={styles.border} />}
      {isMessageEditing && (
        <FontAwesomeIcon
          className={classNames(styles.icon, styles.colored)}
          icon={faPen}
        />
      )}
      <div className={styles.message}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div onClick={cancelTopBlock} className={styles.close}>
        <FontAwesomeIcon className={styles.icon} icon={faXmark} />
      </div>
    </div>
  );
};
