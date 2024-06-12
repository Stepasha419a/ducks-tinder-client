import { motion } from 'framer-motion';
import {
  useCallback,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';
import { Link } from 'react-router-dom';
import { ChatTabTitle } from '@entities/chat/ui';
import { ROUTES } from '@shared/constants';
import styles from '../ChatsPairsBlock.module.scss';

interface TabsProps {
  isPairsOpened: boolean;
  setIsPairsOpened: Dispatch<SetStateAction<boolean>>;
}

export const Tabs: FC<TabsProps> = ({ isPairsOpened, setIsPairsOpened }) => {
  const handlePairsOpen = useCallback(() => {
    setIsPairsOpened(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChatsOpen = useCallback(() => {
    setIsPairsOpened(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.titles}>
      <Link to={ROUTES.MAIN} onClick={handlePairsOpen} className={styles.title}>
        Pairs
        {isPairsOpened && (
          <motion.div
            animate={{
              borderBottom: '3px solid var(--color--red-100)',
            }}
            layoutId="selected"
          />
        )}
      </Link>
      <ChatTabTitle isActive={!isPairsOpened} handleClick={handleChatsOpen} />
    </div>
  );
};
