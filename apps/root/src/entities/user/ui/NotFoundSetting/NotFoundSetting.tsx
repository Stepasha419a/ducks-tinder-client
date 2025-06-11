import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './NotFoundSetting.module.scss';

interface NotFoundSettingProps {
  url: string;
}

export const NotFoundSetting: FC<NotFoundSettingProps> = ({ url }) => {
  return (
    <div className={styles.block}>
      <div className={styles.notFound}>
        <Link to={url} className={styles.link}>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          <span className={styles.text}>Such setting was not found</span>
        </Link>
      </div>
    </div>
  );
};
