import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useMediaQuery } from '@shared/lib/hooks';
import { Button } from '@shared/ui';
import { ROUTES } from '@shared/constants';
import { Preview } from '@entities/user/components';
import { ProfilePreviewMobile } from './mobile/ProfilePreview.mobile';
import styles from './ProfilePreview.module.scss';

export const ProfilePreview: FC = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

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
