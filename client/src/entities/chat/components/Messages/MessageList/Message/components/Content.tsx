import type { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';
import { Textarea } from '@shared/ui';
import styles from '../Message.module.scss';

interface MessageContentProps {
  isOwn: boolean;
  isSelectOpen: boolean;
  isMessageEditing: boolean;
  username: string;
  editingValue: string;
  setEditingValue: Dispatch<SetStateAction<string>>;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Content: FC<MessageContentProps> = ({
  isOwn,
  isSelectOpen,
  isMessageEditing,
  username,
  editingValue,
  setEditingValue,
  text,
  createdAt,
  updatedAt,
}) => {
  const isEdited = createdAt !== updatedAt;

  const cnMessage = classNames(
    styles.message,
    isOwn && styles.own,
    isSelectOpen && styles.selected,
    isMessageEditing && styles.editing,
    isEdited && styles.edited
  );

  const time = isEdited
    ? `edited ${new Date(updatedAt).toLocaleTimeString()}`
    : new Date(createdAt).toLocaleTimeString();

  return (
    <div className={cnMessage}>
      {!isOwn && <div className={styles.username}>{username}</div>}
      <div className={styles.content}>
        {isMessageEditing ? (
          <Textarea
            onChange={(e) => setEditingValue(e.target.value)}
            value={editingValue}
            extraClassName={styles.textarea}
          />
        ) : (
          <>
            <div className={styles.text}>{text}</div>
            <p className={styles.timestamp}>{time}</p>
          </>
        )}
      </div>
    </div>
  );
};