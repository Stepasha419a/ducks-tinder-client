import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faGear, faPen } from '@fortawesome/free-solid-svg-icons';
import { UploadImagePopups } from '@/features/user/components';
import { useAppSelector } from '@shared/lib/hooks';
import { Avatar } from '@shared/ui';
import { ROUTES } from '@shared/constants';
import styles from './ProfilePreview.mobile.module.scss';
import { useState } from 'react';

export const ProfilePreviewMobile = () => {
  const user = useAppSelector((state) => state.user.currentUser!);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const openSettingHandler = (): void => {
    setIsUploadOpen(true);
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.miniature}>
          <div className={styles.wrapper}>
            <Link to={`${ROUTES.PROFILE}/edit`} className={styles.user}>
              <div className={styles.avatarWrapper}>
                <Avatar
                  avatarUrl={user.pictures[0]?.name}
                  size="xl"
                  extraClassName={styles.avatar}
                />
              </div>
              <div className={styles.descr}>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.age}>{user.age}</div>
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
                Settings
              </Link>
              <Link to={`${ROUTES.PROFILE}/edit`} className={styles.action}>
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon className={styles.icon} icon={faPen} />
                </div>
                Change profile
              </Link>
              <div
                onClick={openSettingHandler}
                className={classNames(
                  styles.action,
                  styles.top,
                  styles.pointer
                )}
              >
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon className={styles.icon} icon={faCamera} />
                </div>
                Add photos
              </div>
            </div>
          </div>
        </div>
        <div className={styles.membership}>membership</div>
      </div>
      <UploadImagePopups
        isUploadOpen={isUploadOpen}
        setIsUploadOpen={setIsUploadOpen}
      />
    </>
  );
};
