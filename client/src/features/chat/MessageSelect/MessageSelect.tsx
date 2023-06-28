import type { Dispatch, FC, SetStateAction } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faFloppyDisk,
  faPen,
  faReply,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import type { Message } from '@shared/api/interfaces';
import {
  useAppDispatch,
  useAppSelector,
  useOnClickOutside,
} from '@shared/hooks';
import styles from './MessageSelect.module.scss';
import {
  deleteMessageThunk,
  editMessageThunk,
  setRepliedMessage,
} from '@/entities/chat/model';
import { getDatesHourDiff } from '@/shared/helpers';

interface MessageSelectProps {
  setCurrentMessage: Dispatch<SetStateAction<Message | null>>;
  currentMessage: Message;
  setIsMessageEditing: Dispatch<SetStateAction<boolean>>;
  isMessageEditing: boolean;
  editingValue: string;
}

export const MessageSelect: FC<MessageSelectProps> = ({
  setCurrentMessage,
  currentMessage,
  setIsMessageEditing,
  isMessageEditing,
  editingValue,
}) => {
  const dispatch = useAppDispatch();
  const selectRef = useRef<HTMLDivElement | null>(null);

  const currentUserId = useAppSelector((state) => state.user.currentUser.id);
  const isOwn = currentMessage.userId === currentUserId;

  const handleSelectClickOutside = () => {
    if (!isMessageEditing) {
      setCurrentMessage(null);
    }
  };

  const handleDeleteMessage = () => {
    dispatch(deleteMessageThunk(currentMessage.id));
  };

  const handleEditMessage = () => {
    setIsMessageEditing(true);
  };

  const handleRepliedMessage = () => {
    setCurrentMessage(null);
    dispatch(setRepliedMessage(currentMessage));
  };

  const handleSaveMessage = () => {
    const trimmedValue = editingValue.trim();
    if (trimmedValue) {
      dispatch(
        editMessageThunk({ messageId: currentMessage.id, text: trimmedValue })
      );
      setCurrentMessage(null);
      setIsMessageEditing(false);
    }
  };

  const handleCancelMessage = () => {
    setCurrentMessage(null);
    setIsMessageEditing(false);
  };

  useOnClickOutside(selectRef, handleSelectClickOutside);

  const isMessageEditable =
    isOwn &&
    getDatesHourDiff(new Date(), new Date(currentMessage.createdAt)) < 6;
  const isMessageDeleting =
    isOwn &&
    getDatesHourDiff(new Date(), new Date(currentMessage.createdAt)) < 12;

  if (isMessageEditing) {
    return (
      <div ref={selectRef} className={styles.select}>
        <div onClick={handleSaveMessage} className={styles.item}>
          <p>Save</p>
          <FontAwesomeIcon className={styles.icon} icon={faFloppyDisk} />
        </div>
        <div
          onClick={handleCancelMessage}
          className={classNames(styles.item, styles.remove)}
        >
          <p>Cancel</p>
          <FontAwesomeIcon className={styles.icon} icon={faBan} />
        </div>
      </div>
    );
  }

  return (
    <div ref={selectRef} className={styles.select}>
      <div onClick={handleRepliedMessage} className={styles.item}>
        <p>Reply</p>
        <FontAwesomeIcon className={styles.icon} icon={faReply} />
      </div>
      {isMessageEditable && (
        <div onClick={handleEditMessage} className={styles.item}>
          <p>Edit</p>
          <FontAwesomeIcon className={styles.icon} icon={faPen} />
        </div>
      )}
      {isMessageDeleting && (
        <div
          onClick={handleDeleteMessage}
          className={classNames(styles.item, styles.remove)}
        >
          <p>Remove</p>
          <FontAwesomeIcon className={styles.icon} icon={faTrash} />
        </div>
      )}
    </div>
  );
};
