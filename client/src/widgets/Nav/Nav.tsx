import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ProfileBlock, UserLinks, ChatsPairsBlock } from './components';
import styles from './Nav.module.scss';

export const Nav = (): ReactElement => {
  const { pathname } = useLocation();

  return (
    <aside className={styles.info}>
      <UserLinks />
      <AnimatePresence>
        {pathname === '/profile' ? (
          <motion.div
            key="profile"
            transition={{ duration: 0.3 }}
            initial={{
              translateX: '-340px',
              borderRight: '1px solid var(--border-main)',
              position: 'absolute',
            }}
            animate={{ translateX: 0, borderRight: '0', width: '100%' }}
            exit={{
              translateX: '-340px',
              borderRight: '1px solid var(--border-main)',
            }}
          >
            <ProfileBlock />
          </motion.div>
        ) : (
          <motion.div
            key="chats-pairs"
            transition={{ duration: 0.3 }}
            initial={{
              translateX: '-340px',
              position: 'absolute',
            }}
            animate={{ translateX: 0 }}
          >
            <ChatsPairsBlock />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
