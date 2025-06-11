import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './LinkThumbnail.module.scss';

interface LinkThumbnailProps {
  title: string;
  href: string;
}

export const LinkThumbnail: FC<LinkThumbnailProps> = ({ title, href }) => {
  return (
    <div className={styles.thumbnail}>
      <Link to={href} className={styles.link} target="_blank">
        <div className={styles.descr}>
          <div className={styles.title}>{title}</div>
          <div className={styles.setting}>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className={styles.icon}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
