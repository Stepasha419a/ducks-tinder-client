import type { FC } from 'react';
import classNames from 'classnames';

import * as styles from './Reply.module.scss';

interface ReplyProps {
  repliedUsername: string | undefined;
  repliedMessageText: string | undefined;
  isOwn: boolean;
}

export const Reply: FC<ReplyProps> = ({
  repliedUsername,
  repliedMessageText,
  isOwn,
}) => {
  const isReply = repliedUsername && repliedMessageText;

  if (!isReply) {
    return null;
  }

  const cn = classNames(styles.reply, isOwn && styles.own);

  return (
    <div className={cn}>
      <div className={styles.border} />
      <div className={styles.reply_message}>
        <div className={styles.reply_username}>{repliedUsername}</div>
        <div className={styles.reply_text}>{repliedMessageText}</div>
      </div>
    </div>
  );
};
