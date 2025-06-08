import type { ReactElement } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import * as styles from './FailedChats.module.scss';

export const FailedChats = (): ReactElement => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  return (
    <div className={classNames(styles.noPairs, isMobile && styles.mobile)}>
      <FontAwesomeIcon icon={faHeart} className={styles.icon} />
      <div>
        You don't have chats. Accept some pairs to have personal chats with them
      </div>
    </div>
  );
};
