import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { ROUTES } from '@ducks-tinder-client/common';

import * as styles from './ChatProfile.mobile.module.scss';
import { useChatSelector } from '@shared/lib/hooks';

export const ChatProfileMobileLazy = () => {
  const isNotFound = useChatSelector((state) => state.chat.isNotFound);

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
