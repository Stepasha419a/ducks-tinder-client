import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatList } from 'chatApp/chat';
import { AnimatePresence, motion } from 'motion/react';

import { PairLink } from '@entities/user';

import { chatListVariants, pairLinkVariants } from './ChatsPairsBlock.variants';
import { Tabs } from './components';
import * as styles from './ChatsPairsBlock.module.scss';
import { getIsChatPage } from '@widgets/Nav/lib';
import { useUserStore } from '@ducks-tinder-client/auth';

export const ChatsPairsBlock: FC = () => {
  const { pathname } = useLocation();

  const currentUserId = useUserStore((state) => state.currentUser?.id);

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPairsOpened(!getIsChatPage(pathname));
  }, [pathname]);

  if (!currentUserId) {
    return null;
  }

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
              className={styles.block}
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
              className={styles.block}
            >
              <ChatList currentUserId={currentUserId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
