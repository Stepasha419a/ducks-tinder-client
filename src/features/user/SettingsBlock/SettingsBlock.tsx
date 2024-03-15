import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector, useMediaQuery } from '@hooks';
import { useSettingUrl } from '@entities/user/lib';
import { Setting, SettingsList } from './components';
import { settingVariants } from './SettingsBlock.variants';
import styles from './SettingsBlock.module.scss';
import { NotFoundSetting } from '@entities/user/components';
import { ROUTES } from '@shared/lib/constants';

export const SettingsBlock = (): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const settingType = useAppSelector((state) => state.setting.settingType);
  const isFound = useSettingUrl();

  if (isFound === false) {
    return <NotFoundSetting url={ROUTES.profile} />;
  }

  const slideIn = isMobile ? 'slideInMobile' : 'slideIn';
  const slideOut = isMobile ? 'slideOutMobile' : 'slideOut';

  return (
    <div className={styles.block}>
      <AnimatePresence initial={false} mode="wait">
        {settingType && isFound ? (
          <motion.div
            key="setting"
            variants={settingVariants}
            initial={slideOut}
            animate={slideIn}
            exit={slideOut}
            transition={{ duration: 0.25 }}
          >
            <Setting />
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
