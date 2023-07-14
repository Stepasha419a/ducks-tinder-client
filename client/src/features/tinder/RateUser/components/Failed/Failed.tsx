import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './Failed.module.scss';

export const Failed = (): ReactElement => {
  return (
    <Link to="/profile" className={styles.failed}>
      <div className={styles.text}>You don't have users currently</div>
      <div className={styles.subtext}>
        Click to change your prefer settings to get more opportunities
      </div>
    </Link>
  );
};
