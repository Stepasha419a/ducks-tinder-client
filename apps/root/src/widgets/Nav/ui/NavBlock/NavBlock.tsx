import type { FC } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { SettingsBlock } from '@features/SettingsBlock';

import { NavBlockEnum } from '../../lib';
import { ChatsPairsBlock } from './components';
import { chatPairsVariants, profileVariants } from './NavBlock.variants';
import * as styles from './NavBlock.module.scss';

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
        className={classNames(styles.block)}
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
