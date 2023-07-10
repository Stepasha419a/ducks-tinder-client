import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ProfileBlock, UserLinks, ChatsPairsBlock } from './components';
import { chatPairsVariants, profileVariants } from './Nav.variants';
import styles from './Nav.module.scss';

export const Nav = (): ReactElement => {
  const { pathname } = useLocation();

  const isProfilePage = /profile\/?.*/.test(pathname);
  return (
    <aside className={styles.info}>
      <UserLinks isProfilePage={isProfilePage} />
      <AnimatePresence initial={false} mode="wait">
        {isProfilePage ? (
          <motion.div
            key="profile"
            variants={profileVariants}
            initial={'slideOut'}
            animate={'slideIn'}
            exit={'slideOut'}
            transition={{ duration: 0.25 }}
          >
            <ProfileBlock />
          </motion.div>
        ) : (
          <motion.div
            key="chats-pairs"
            variants={chatPairsVariants}
            initial={'slideOut'}
            animate={'slideIn'}
            exit={'slideOut'}
            transition={{ duration: 0.25 }}
          >
            <ChatsPairsBlock />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
