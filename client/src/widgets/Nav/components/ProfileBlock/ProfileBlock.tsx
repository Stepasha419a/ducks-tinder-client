import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@hooks';
import { Setting } from './Setting/Setting';
import { SettingsList } from './SettingsList/SettingsList';
import styles from './ProfileBlock.module.scss';

export const ProfileBlock = (): ReactElement => {
  const isUserInfoSetting = useAppSelector(
    (state) => state.setting.isUserInfoSetting
  );

  return (
    <div className={styles.block}>
      <AnimatePresence>
        {isUserInfoSetting ? (
          <motion.div
            initial={{
              translateX: '340px',
              borderLeft: '1px solid var(--border-main)',
            }}
            animate={{ translateX: 0, borderRight: '0' }}
            transition={{ duration: 0.3 }}
            exit={{
              translateX: '340px',
              borderLeft: '1px solid var(--border-main)',
            }}
            key="setting"
          >
            <Setting />
          </motion.div>
        ) : (
          <SettingsList />
        )}
      </AnimatePresence>
    </div>
  );
};
