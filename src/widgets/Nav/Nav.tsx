import type { FC, ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserLinks, ChatsPairsBlock } from './components';
import { chatPairsVariants, profileVariants } from './Nav.variants';
import { NavMobile } from './mobile/Nav.mobile';
import { SettingsBlock } from '@features/setting';
import styles from './Nav.module.scss';
import { useIsCheckedProfilePage } from './lib/hooks';

interface NavProps {
  isMobile?: boolean;
}

export const Nav: FC<NavProps> = ({ isMobile }): ReactElement => {
  const isProfilePage = useIsCheckedProfilePage();

  if (isMobile) {
    return <NavMobile />;
  }

  return (
    <aside className={styles.nav}>
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
            className={styles.profile}
          >
            <SettingsBlock />
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
