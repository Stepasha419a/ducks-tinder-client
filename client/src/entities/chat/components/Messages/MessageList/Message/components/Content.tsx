import type { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';
import { Textarea } from '@shared/ui';
import styles from '../Message.module.scss';
import { getTime } from '@/shared/helpers';

interface MessageContentProps {
  isOwn: boolean;
  isSelectOpen: boolean;
  isMessageEditing: boolean;
  username: string | undefined;
  editingValue: string;
  setEditingValue: Dispatch<SetStateAction<string>>;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  repliedMessageText: string | undefined;
  repliedUsername: string | undefined;
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
  repliedMessageText,
  repliedUsername,
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
    ? `edited ${getTime(new Date(updatedAt).toLocaleTimeString())!.toString()}`
    : getTime(new Date(createdAt).toLocaleTimeString());

  const isReply = repliedMessageText && repliedUsername;

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
            {isReply && (
              <div className={styles.reply}>
                <div className={styles.border} />
                <div className={styles.reply_message}>
                  <div className={styles.reply_username}>{repliedUsername}</div>
                  <div className={styles.reply_text}>{repliedMessageText}</div>
                </div>
              </div>
            )}
            <div className={styles.text}>{text}</div>
            <p className={styles.timestamp}>{time}</p>
          </>
        )}
      </div>
    </div>
  );
};
