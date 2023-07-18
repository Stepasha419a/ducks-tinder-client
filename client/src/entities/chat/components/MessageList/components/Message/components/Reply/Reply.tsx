import type { FC } from 'react';
import styles from './Reply.module.scss';

interface ReplyProps {
  repliedUsername: string | undefined;
  repliedMessageText: string | undefined;
}

export const Reply: FC<ReplyProps> = ({
  repliedUsername,
  repliedMessageText,
}) => {
  const isReply = repliedUsername && repliedMessageText;

  if (!isReply) {
    return null;
  }

  return (
    <div className={styles.reply}>
      <div className={styles.border} />
      <div className={styles.reply_message}>
        <div className={styles.reply_username}>{repliedUsername}</div>
        <div className={styles.reply_text}>{repliedMessageText}</div>
      </div>
    </div>
  );
};
