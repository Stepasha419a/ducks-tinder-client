import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import * as styles from './Failed.module.scss';

interface FailedProps {
  title: string;
  text: string;
}

export const Failed: React.FC<FailedProps> = ({
  text,
  title,
}): ReactElement => {
  return (
    <Link to="/profile" className={styles.failed}>
      <div className={styles.text}>{title}</div>
      <div className={styles.subtext}>{text}</div>
    </Link>
  );
};
