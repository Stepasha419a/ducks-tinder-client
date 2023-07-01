import type { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../ChatsPairsBlock.module.scss';

interface TabsProps {
  isPairsOpened: boolean;
  setIsPairsOpened: Dispatch<SetStateAction<boolean>>;
}

export const Tabs: FC<TabsProps> = ({ isPairsOpened, setIsPairsOpened }) => {
  const cnPairs = classNames(styles.title, isPairsOpened && styles.active);
  const cnMessages = classNames(styles.title, !isPairsOpened && styles.active);

  return (
    <div className={styles.titles}>
      <Link to="/" onClick={() => setIsPairsOpened(true)} className={cnPairs}>
        Pairs
      </Link>
      <div onClick={() => setIsPairsOpened(false)} className={cnMessages}>
        Messages
      </div>
    </div>
  );
};
