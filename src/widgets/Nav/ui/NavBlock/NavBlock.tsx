import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { SettingsBlock } from '@features/user';
import { NavBlockEnum } from '../../lib';
import { ChatsPairsBlock } from './components';
import styles from './NavBlock.module.scss';
import { chatPairsVariants, profileVariants } from './NavBlock.variants';

interface NavBlockProps {
  navBlock: NavBlockEnum;
}

export const NavBlock: FC<NavBlockProps> = ({ navBlock }) => {
  if (navBlock === NavBlockEnum.Setting) {
    return (
      <motion.div
        key="profile"
        variants={profileVariants}
        initial={'slideOut'}
        animate={'slideIn'}
        exit={'slideOut'}
        transition={{ duration: 0.25 }}
        className={classNames(styles.block, styles.profile)}
      >
        <SettingsBlock />
      </motion.div>
    );
  }

  if (navBlock === NavBlockEnum.Explore) {
    return (
      <motion.div
        key="explore"
        variants={chatPairsVariants}
        initial={'slideOut'}
        animate={'slideIn'}
        exit={'slideOut'}
        transition={{ duration: 0.25 }}
        className={classNames(styles.block, styles.explore)}
      >
        <h3 className={styles.title}>That's Explore</h3>
        <p className={styles.text}>My vibe...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="chats-pairs"
      variants={chatPairsVariants}
      initial={'slideOut'}
      animate={'slideIn'}
      exit={'slideOut'}
      transition={{ duration: 0.25 }}
      className={styles.block}
    >
      <ChatsPairsBlock />
    </motion.div>
  );
};
