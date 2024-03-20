import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from '@hooks';
import { Setting, SettingsList } from './components';
import { settingVariants } from './SettingsBlock.variants';
import styles from './SettingsBlock.module.scss';
import { NotFoundSetting } from '@entities/user/components';
import { ROUTES } from '@shared/lib/constants';
import { useFoundSetting } from '@/entities/user/lib/hooks';

export const SettingsBlock = (): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const setting = useFoundSetting();

  if (setting === null) {
    return <NotFoundSetting url={ROUTES.profile} />;
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
