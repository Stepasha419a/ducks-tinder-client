import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES, useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { Button, Preview } from '@ducks-tinder-client/ui';

import { ProfilePreviewMobile } from './mobile';
import * as styles from './ProfilePreview.module.scss';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@ducks-tinder-client/auth';

export const ProfilePreview: FC = () => {
  const { t } = useTranslation();

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const user = useUserStore((state) => state.currentUser);

  if (!user) {
    return null;
  }

  if (isMobile) {
    return <ProfilePreviewMobile />;
  }

  return (
    <>
      <Preview user={user} isFull extraClassName={styles.padding} />
      <div className={styles.edit}>
        <Link to={`${ROUTES.PROFILE}/edit`} className={styles.link}>
          <Button variant="gradient" extraClassName={styles.btn}>
            {t('profile.editInfo')}
          </Button>
        </Link>
      </div>
    </>
  );
};
