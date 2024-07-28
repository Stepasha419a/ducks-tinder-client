import { AnimatePresence, motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { useFoundSetting, NotFoundSetting } from '@entities/user';
import { useAdaptiveMediaQuery } from '@shared/lib';
import { ROUTES } from '@shared/lib';
import styles from './SettingsBlock.module.scss';
import { settingVariants } from './SettingsBlock.variants';
import { Setting, SettingsList } from './ui';

export const SettingsBlock = (): ReactElement => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const setting = useFoundSetting();

  if (setting === null) {
    return <NotFoundSetting url={ROUTES.PROFILE} />;
  }

  const slideIn = isMobile ? 'slideInMobile' : 'slideIn';
  const slideOut = isMobile ? 'slideOutMobile' : 'slideOut';

  return (
    <div className={styles.block}>
      <AnimatePresence initial={false} mode="wait">
        {setting ? (
          <motion.div
            key="setting"
            variants={settingVariants}
            initial={slideOut}
            animate={slideIn}
            exit={slideOut}
            transition={{ duration: 0.25 }}
            className={styles.setting}
          >
            <Setting settingName={setting} />
          </motion.div>
        ) : (
          <motion.div
            key="setting-list"
            variants={settingVariants}
            initial={slideOut}
            animate={slideIn}
            exit={slideOut}
            transition={{ duration: 0.25 }}
            className={styles.setting}
          >
            <SettingsList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
