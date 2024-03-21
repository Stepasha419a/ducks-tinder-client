import type { FC } from 'react';
import { ROUTES } from '@shared/lib/constants';
import { Link } from 'react-router-dom';
import styles from './ProfileSubmit.mobile.module.scss';

interface ProfileSubmitMobileProps {
  handleSubmit: () => void;
}

export const ProfileSubmitMobile: FC<ProfileSubmitMobileProps> = ({
  handleSubmit,
}) => {
  return (
    <div className={styles.head}>
      <div className={styles.title}>Edit profile</div>
      <Link
        onClick={handleSubmit}
        to={ROUTES.PROFILE}
        className={styles.submit}
      >
        Submit
      </Link>
    </div>
  );
};
