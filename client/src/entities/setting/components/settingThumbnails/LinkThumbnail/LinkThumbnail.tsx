import type { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from '../SettingThumbnail.module.scss';
import classNames from 'classnames';

interface LinkThumbnailProps {
  title: string;
  href: string;
}

export const LinkThumbnail: FC<LinkThumbnailProps> = ({
  title,
  href,
}) => {
  return (
    <div className={classNames(styles.thumbnail, styles.link)}>
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
