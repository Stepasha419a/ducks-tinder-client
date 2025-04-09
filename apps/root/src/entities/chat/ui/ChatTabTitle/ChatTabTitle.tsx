import type { FC } from 'react';
import { motion } from 'framer-motion';

import { useAppSelector } from '@shared/lib';

import styles from './ChatTabTitle.module.scss';

interface ChatTabTitleProps {
  handleClick: () => void;
  isActive: boolean;
}

export const ChatTabTitle: FC<ChatTabTitleProps> = ({
  handleClick,
  isActive,
}) => {
  const newMessageChatsCount = useAppSelector(
    (state) => state.chat.newMessagesCount
  );

  const isLoadedNewMessagesCount = newMessageChatsCount !== null;
  const isNewMessages = isLoadedNewMessagesCount && newMessageChatsCount > 0;

  return (
    <div onClick={handleClick} className={styles.title}>
      {isNewMessages && (
        <div className={styles.newMessages}>
          <div className={styles.count}>
            {newMessageChatsCount > 9 ? '9+' : newMessageChatsCount}
          </div>
        </div>
      )}
      Messages
      {isActive && (
        <motion.div
          animate={{
            borderBottom: '3px solid var(--color--red-100)',
          }}
          layoutId="selected"
        />
      )}
    </div>
  );
};
