import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@hooks';
import { ROUTES } from '@shared/lib/constants';
import styles from './ChatProfile.mobile.module.scss';

export const ChatProfileMobileLazy = () => {
  const isNotFound = useAppSelector((state) => state.chat.isNotFound);

  return (
    <div className={styles.profile}>
      <Link className={styles.link} to={ROUTES.CHAT}>
        <FontAwesomeIcon className={styles.icon} icon={faAngleLeft} />
      </Link>
      {!isNotFound && (
        <div className={classNames(styles.user, styles.lazy)}>
          <Skeleton circle height={40} width={40} />
          <Skeleton className={styles.name} height={22} width={80} />
        </div>
      )}
    </div>
  );
};
