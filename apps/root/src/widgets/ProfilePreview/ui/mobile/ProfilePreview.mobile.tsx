import { Link } from 'react-router-dom';
import { faCamera, faGear, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { ROUTES } from '@ducks-tinder-client/common';
import { Avatar } from '@ducks-tinder-client/ui';

import * as styles from './ProfilePreview.mobile.module.scss';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@ducks-tinder-client/auth';
import { useImageUpload } from '@features/CropImage';

export const ProfilePreviewMobile = () => {
  const { t } = useTranslation();

  const user = useUserStore((state) => state.currentUser);

  const { handleUploadImage } = useImageUpload();

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.miniature}>
          <div className={styles.wrapper}>
            <Link to={`${ROUTES.PROFILE}/edit`} className={styles.user}>
              <div className={styles.avatarWrapper}>
                <Avatar
                  avatarUrl={user?.pictures[0]?.name}
                  size="xl"
                  extraClassName={styles.avatar}
                />
              </div>
              <div className={styles.descr}>
                <div className={styles.name}>{user?.name}</div>
                <div className={styles.age}>{user?.age}</div>
              </div>
            </Link>
            <div className={styles.actions}>
              <Link
                to={ROUTES.SETTINGS}
                className={classNames(styles.action, styles.top)}
              >
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon className={styles.icon} icon={faGear} />
                </div>
                {t('profile.settingsMobile')}
              </Link>
              <Link to={`${ROUTES.PROFILE}/edit`} className={styles.action}>
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon className={styles.icon} icon={faPen} />
                </div>
                {t('profile.changeProfile')}
              </Link>
              <div
                onClick={handleUploadImage}
                className={classNames(
                  styles.action,
                  styles.top,
                  styles.pointer
                )}
              >
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon className={styles.icon} icon={faCamera} />
                </div>
                {t('profile.addPhotos')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
