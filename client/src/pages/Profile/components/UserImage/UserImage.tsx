import type { FC } from 'react';
import { useAppSelector } from '@hooks';
import { Button } from '@shared/ui';
import { Preview } from '@entities/user/components';
import styles from './UserImage.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';

export const UserImage: FC = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <>
      <Preview user={currentUser} isFull extraClassName={styles.padding} />
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
