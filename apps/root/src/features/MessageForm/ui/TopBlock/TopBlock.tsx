import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { FC } from 'react';
import type { Message } from '@shared/api';
import { useAppSelector } from '@shared/lib';
import styles from './TopBlock.module.scss';

interface TopBlockProps {
  repliedMessage: Message | null;
  editingMessage: Message | null;
  cancelTopBlock: () => void;
}

export const TopBlock: FC<TopBlockProps> = ({
  repliedMessage,
  editingMessage,
  cancelTopBlock,
}) => {
  const currentUserId = useAppSelector((state) => state.user.currentUser?.id);

  const isOwnReplied = repliedMessage?.userId === currentUserId;
  const repliedName = isOwnReplied
    ? repliedMessage?.name
    : repliedMessage?.name;

  const title = editingMessage ? 'Editing' : repliedName;
  const text = editingMessage ? editingMessage.text : repliedMessage?.text;

  const cn = classNames(styles.block, repliedMessage && styles.replied);

  return (
    <div className={cn}>
      {repliedMessage && <div className={styles.border} />}
      {editingMessage && (
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
