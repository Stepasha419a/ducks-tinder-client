import type { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@hooks';
import { useSettingUrl } from '@/entities/setting/hooks';
import { Setting } from './Setting/Setting';
import { SettingsList } from './SettingsList/SettingsList';
import { settingVariants } from './ProfileBlock.variants';
import styles from './ProfileBlock.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

export const ProfileBlock = (): ReactElement => {
  const isUserInfoSetting = useAppSelector(
    (state) => state.setting.isUserInfoSetting
  );
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
