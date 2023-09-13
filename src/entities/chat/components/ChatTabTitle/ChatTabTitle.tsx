import type { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './ChatTabTitle.module.scss';
import { useAppSelector } from '@shared/lib/hooks';
import { selectNewMessageChatsCount } from '../../model';

interface ChatTabTitleProps {
  handleClick: () => void;
  isActive: boolean;
}

export const ChatTabTitle: FC<ChatTabTitleProps> = ({
  handleClick,
  isActive,
}) => {
  const newMessageChatsCount = useAppSelector(selectNewMessageChatsCount);
  const reducedCount = newMessageChatsCount > 9 ? '9+' : newMessageChatsCount;

  return (
    <div onClick={handleClick} className={styles.title}>
      {newMessageChatsCount > 0 && (
        <div className={styles.newMessages}>
          <div className={styles.count}>{reducedCount}</div>
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
