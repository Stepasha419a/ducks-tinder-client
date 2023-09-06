import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PairLink } from '@entities/user/components';
import { Tabs } from './Tabs/Tabs';
import { chatListVariants, pairLinkVariants } from './ChatsPairsBlock.variants';
import { getIsChatPage } from '@entities/chat/lib';
import { ChatList } from '@entities/chat/components';
import styles from './ChatsPairsBlock.module.scss';

export const ChatsPairsBlock: FC = () => {
  const { pathname } = useLocation();

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  useEffect(() => {
    setIsPairsOpened(!getIsChatPage(pathname));
  }, [pathname]);

  return (
    <>
      <Tabs isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened} />
      <div className={styles.content}>
        <AnimatePresence initial={false} mode="wait">
          {isPairsOpened ? (
            <motion.div
              key="pair-link"
              variants={pairLinkVariants}
              initial={'slideOut'}
              animate={'slideIn'}
              exit={'slideOut'}
              transition={{ duration: 0.25 }}
            >
              <PairLink />
            </motion.div>
          ) : (
            <motion.div
              key="chat-list"
              variants={chatListVariants}
              initial={'slideOut'}
              animate={'slideIn'}
              exit={'slideExit'}
              transition={{ duration: 0.25 }}
            >
              <ChatList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
