import type { FC } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './MessageSelect.module.scss';
import { useOnClickOutside } from '@/shared/hooks';

interface MessageSelectProps {
  setCurrentMessageId: (id: string | null) => void;
  currentMessageId: string;
}

export const MessageSelect: FC<MessageSelectProps> = ({
  setCurrentMessageId,
  currentMessageId,
}) => {
  console.log(currentMessageId);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleSelectClickOutside = () => {
    setCurrentMessageId(null);
  };

  useOnClickOutside(selectRef, handleSelectClickOutside);

  return (
    <div ref={selectRef} className={styles.select}>
      <div className={styles.item}>
        <p>Edit</p>
        <FontAwesomeIcon className={styles.icon} icon={faPen} />
      </div>
      <div className={classNames(styles.item, styles.remove)}>
        <p>Remove</p>
        <FontAwesomeIcon className={styles.icon} icon={faTrash} />
      </div>
    </div>
  );
};
