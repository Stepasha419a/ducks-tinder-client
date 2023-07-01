import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PairLink } from '@entities/user/components';
import { OpenChatList } from '@features/chat';
import styles from './ChatsPairsBlock.module.scss';
import { Tabs } from './Tabs/Tabs';

export const ChatsPairsBlock: FC = () => {
  const { pathname } = useLocation();

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  useEffect(() => {
    setIsPairsOpened(!/chat\/./.test(pathname));
  }, [pathname]);

  return (
    <>
      <Tabs isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened} />
      <div className={styles.content}>
        {isPairsOpened ? <PairLink /> : <OpenChatList />}
      </div>
    </>
  );
};
