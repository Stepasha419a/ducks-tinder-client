import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { PairLink } from '@entities/user/components';
import { OpenChatList } from '@features/chat';
import styles from './ChatsPairsBlock.module.scss';

export const ChatsPairsBlock: FC = () => {
  const { pathname } = useLocation();

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  const cnPairs = classNames(styles.title, isPairsOpened && styles.active);
  const cnMessages = classNames(styles.title, !isPairsOpened && styles.active);

  useEffect(() => {
    setIsPairsOpened(!(pathname === '/chat'));
  }, [pathname]);

  return (
    <>
      <div className={styles.titles}>
        <Link onClick={() => setIsPairsOpened(true)} className={cnPairs} to="/">
          Pairs
        </Link>
        <Link
          onClick={() => setIsPairsOpened(false)}
          className={cnMessages}
          to="/chat"
        >
          Messages
        </Link>
      </div>
      <div className={styles.content}>
        {isPairsOpened ? <PairLink /> : <OpenChatList />}
      </div>
    </>
  );
};
