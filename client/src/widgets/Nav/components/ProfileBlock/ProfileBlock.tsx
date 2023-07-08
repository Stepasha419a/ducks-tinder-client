import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@hooks';
import { Setting } from './Setting/Setting';
import { SettingsList } from './SettingsList/SettingsList';
import { settingVariants } from './ProfileBlock.variants';
import styles from './ProfileBlock.module.scss';

export const ProfileBlock = (): ReactElement => {
  const isUserInfoSetting = useAppSelector(
    (state) => state.setting.isUserInfoSetting
  );

  return (
    <div className={styles.block}>
      <AnimatePresence initial={false} mode="wait">
        {isUserInfoSetting ? (
          <motion.div
            key="setting"
            variants={settingVariants}
            initial={'slideOut'}
            animate={'slideIn'}
            exit={'slideOut'}
            transition={{ duration: 0.25 }}
          >
            <Setting />
          </motion.div>
        ) : (
          <motion.div
            key="setting-list"
            variants={settingVariants}
            initial={'slideOut'}
            animate={'slideIn'}
            exit={'slideOut'}
            transition={{ duration: 0.25 }}
          >
            <SettingsList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
