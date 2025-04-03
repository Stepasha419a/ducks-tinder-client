import { useAdaptiveMediaQuery, ROUTES } from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Preview } from '@entities/user';
import { useAppSelector } from '@shared/lib';
import { ProfilePreviewMobile } from './mobile';
import styles from './ProfilePreview.module.scss';

export const ProfilePreview: FC = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const user = useAppSelector((state) => state.user.currentUser!);

  if (isMobile) {
    return <ProfilePreviewMobile />;
  }

  return (
    <>
      <Preview user={user} isFull extraClassName={styles.padding} />
      <div className={styles.edit}>
        <Link to={`${ROUTES.PROFILE}/edit`} className={styles.link}>
          <Button variant="gradient" extraClassName={styles.btn}>
            Edit Info
          </Button>
        </Link>
      </div>
    </>
  );
};
