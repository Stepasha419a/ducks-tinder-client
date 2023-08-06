import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '@shared/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faGear, faPen } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@shared/ui';
import { ROUTES } from '@shared/constants';
import { selectPreviewUser } from '@entities/user/model';
import styles from './ProfilePreview.mobile.module.scss';

export const ProfilePreviewMobile = () => {
  const previewUser = useAppSelector(selectPreviewUser);

  return (
    <div className={styles.profile}>
      <div className={styles.miniature}>
        <div className={styles.wrapper}>
          <Link to={`${ROUTES.profile}/edit`} className={styles.user}>
            <div className={styles.avatarWrapper}>
              <Avatar
                userId={previewUser.id}
                avatarUrl={previewUser.pictures[0]?.name}
                size="xl"
                extraClassName={styles.avatar}
              />
            </div>
            <div className={styles.descr}>
              <div className={styles.name}>{previewUser.name}</div>
              <div className={styles.age}>{previewUser.age}</div>
            </div>
          </Link>
          <div className={styles.links}>
            <Link
              to={`${ROUTES.profile}/settings`}
              className={classNames(styles.link, styles.top)}
            >
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon className={styles.icon} icon={faGear} />
              </div>
              Settings
            </Link>
            <Link to={`${ROUTES.profile}/edit`} className={styles.link}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon className={styles.icon} icon={faPen} />
              </div>
              Change profile
            </Link>
            <Link
              to={`${ROUTES.profile}/edit`}
              className={classNames(styles.link, styles.top)}
            >
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon className={styles.icon} icon={faCamera} />
              </div>
              Add photos
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.membership}>membership</div>
    </div>
  );
};
