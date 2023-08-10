import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@hooks';
import { useSettingUrl } from '@entities/setting/lib';
import { Setting, SettingsList } from './components';
import { settingVariants } from './SettingsBlock.variants';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import styles from './SettingsBlock.module.scss';

export const SettingsBlock = (): ReactElement => {
  const settingType = useAppSelector((state) => state.setting.settingType);
  const isFound = useSettingUrl();

  if (isFound === false) {
    return (
      <div className={styles.block}>
        <div className={styles.notFound}>
          <Link to={ROUTES.profile} className={styles.link}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
            <span className={styles.text}>Such setting was not found</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.block}>
      <AnimatePresence initial={false} mode="wait">
        {settingType && isFound ? (
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
