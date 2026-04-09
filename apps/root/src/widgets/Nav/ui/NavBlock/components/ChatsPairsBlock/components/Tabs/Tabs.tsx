import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { ChatTabTitle } from 'chatApp/chat';
import { motion } from 'motion/react';

import { ROUTES } from '@ducks-tinder-client/common';

import * as styles from '../../ChatsPairsBlock.module.scss';
import { useTranslation } from 'react-i18next';

interface TabsProps {
  isPairsOpened: boolean;
  setIsPairsOpened: Dispatch<SetStateAction<boolean>>;
}

export const Tabs: FC<TabsProps> = ({ isPairsOpened, setIsPairsOpened }) => {
  const { t } = useTranslation();

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
        {t('nav_pairs')}
        {isPairsOpened && (
          <motion.div
            animate={{
              borderBottom: '3px solid var(--color--orange-100)',
            }}
            layoutId="selected"
          />
        )}
      </Link>
      <ChatTabTitle isActive={!isPairsOpened} handleClick={handleChatsOpen} />
    </div>
  );
};
