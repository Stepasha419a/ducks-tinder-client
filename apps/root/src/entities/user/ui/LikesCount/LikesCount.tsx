import type { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppSelector } from '@ducks-tinder-client/common';
import { Skeleton } from '@ducks-tinder-client/ui';

import * as styles from './LikesCount.module.scss';

export const LikesCount: FC = (): ReactElement => {
  const { t } = useTranslation();

  const likes = useAppSelector((state) => state.pair.pairsInfo?.count) ?? 0;
  const isPairsInfoLoading = useAppSelector(
    (state) => state.pair.isPairsInfoLoading
  );

  return (
    <div className={styles.likes}>
      <FontAwesomeIcon
        icon={faHeartCircleExclamation}
        className={styles.icon}
      />
      {isPairsInfoLoading ? (
        <>
          <Skeleton className={styles.loading} height={25} width={20} />
          {t('likes_label')}
        </>
      ) : (
        t('likes_count', { count: likes })
      )}
    </div>
  );
};
