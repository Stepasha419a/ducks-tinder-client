import type { FC } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Message } from '@shared/api/interfaces';
import { useAppDispatch, useOnClickOutside } from '@shared/hooks';
import styles from './MessageSelect.module.scss';
import { deleteMessageThunk } from '@/entities/chat/model';

interface MessageSelectProps {
  setCurrentMessage: (message: Message | null) => void;
  currentMessage: Message;
}

export const MessageSelect: FC<MessageSelectProps> = ({
  setCurrentMessage,
  currentMessage,
}) => {
  const dispatch = useAppDispatch();
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleSelectClickOutside = () => {
    setCurrentMessage(null);
  };

  const handleDeleteMessage = () => {
    dispatch(deleteMessageThunk(currentMessage.id));
  };

  useOnClickOutside(selectRef, handleSelectClickOutside);

  return (
    <div ref={selectRef} className={styles.select}>
      <div className={styles.item}>
        <p>Edit</p>
        <FontAwesomeIcon className={styles.icon} icon={faPen} />
      </div>
      <div
        onClick={handleDeleteMessage}
        className={classNames(styles.item, styles.remove)}
      >
        <p>Remove</p>
        <FontAwesomeIcon className={styles.icon} icon={faTrash} />
      </div>
    </div>
  );
};
