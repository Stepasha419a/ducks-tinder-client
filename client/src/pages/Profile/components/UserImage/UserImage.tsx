import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@shared/lib/hooks';
import { Button } from '@shared/ui';
import { ROUTES } from '@shared/constants';
import { selectPreviewUser } from '@entities/user/model';
import { Preview } from '@entities/user/components';
import styles from './UserImage.module.scss';

export const UserImage: FC = () => {
  const previewUser = useAppSelector(selectPreviewUser);

  return (
    <>
      <Preview user={previewUser} isFull extraClassName={styles.padding} />
      <div className={styles.edit}>
        <Link to={`${ROUTES.profile}/edit`} className={styles.link}>
          <Button variant="gradient" extraClassName={styles.btn}>
            Edit Info
          </Button>
        </Link>
      </div>
    </>
  );
};
