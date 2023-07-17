import type { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import { motion } from 'framer-motion';
import styles from '../ChatsPairsBlock.module.scss';

interface TabsProps {
  isPairsOpened: boolean;
  setIsPairsOpened: Dispatch<SetStateAction<boolean>>;
}

export const Tabs: FC<TabsProps> = ({ isPairsOpened, setIsPairsOpened }) => {
  return (
    <div className={styles.titles}>
      <Link
        to={ROUTES.main}
        onClick={() => setIsPairsOpened(true)}
        className={styles.title}
      >
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
      <div onClick={() => setIsPairsOpened(false)} className={styles.title}>
        Messages
        {!isPairsOpened && (
          <motion.div
            animate={{
              borderBottom: '3px solid var(--color--red-100)',
            }}
            layoutId="selected"
          />
        )}
      </div>
    </div>
  );
};
