import { useMediaQuery } from '@hooks';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { useFoundSetting } from '@entities/user/lib/hooks';
import { NotFoundSetting } from '@entities/user/ui';
import { ROUTES } from '@shared/lib/constants';
import { Setting, SettingsList } from './components';
import styles from './SettingsBlock.module.scss';
import { settingVariants } from './SettingsBlock.variants';

export const SettingsBlock = (): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 900px)');

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
          >
            <SettingsList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
