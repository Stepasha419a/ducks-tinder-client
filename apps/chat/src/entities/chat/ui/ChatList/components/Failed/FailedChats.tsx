import type { ReactElement } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import * as styles from './FailedChats.module.scss';
import { useTranslation } from 'react-i18next';

export const FailedChats = (): ReactElement => {
  const { t } = useTranslation('chat');

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  return (
    <div className={classNames(styles.noPairs, isMobile && styles.mobile)}>
      <FontAwesomeIcon icon={faHeart} className={styles.icon} />
      <div>{t('noChats')}</div>
    </div>
  );
};
