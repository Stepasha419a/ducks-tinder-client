import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PairLink } from '@entities/user/components';
import { OpenChatList } from '@features/chat';
import styles from './ChatsPairsBlock.module.scss';
import { Tabs } from './Tabs/Tabs';

export const ChatsPairsBlock: FC = () => {
  const { pathname } = useLocation();

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  useEffect(() => {
    setIsPairsOpened(!/chat\/?.*/.test(pathname));
  }, [pathname]);

  return (
    <>
      <Tabs isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened} />
      <div className={styles.content}>
        <AnimatePresence>
          {isPairsOpened ? (
            <motion.div
              key="pair-link"
              initial={{ translateX: '-340px', position: 'absolute' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '-340px' }}
              transition={{ duration: 0.3 }}
            >
              <PairLink />
            </motion.div>
          ) : (
            <motion.div
              key="chat-list"
              initial={{ translateX: '340px', position: 'absolute' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '340px' }}
              transition={{ duration: 0.3 }}
            >
              <OpenChatList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
