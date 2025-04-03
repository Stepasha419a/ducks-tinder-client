import { ROUTES } from '@ducks-tinder-client/common';
import { Link } from 'react-router-dom';
import styles from './MobileTitle.module.scss';

export const MobileTitle = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Settings</div>
      <Link to={ROUTES.PROFILE} className={styles.submit}>
        Submit
      </Link>
    </div>
  );
};
