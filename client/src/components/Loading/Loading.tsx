import type { ReactElement } from 'react';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAppSelector } from '@hooks';
import styles from './Loading.module.scss';

export const Loading = (): ReactElement => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  return (
    <div
      className={classNames(styles.loadingPage, !isLoading && styles.invisible)}
    >
      <FontAwesomeIcon icon={faFireFlameCurved} className={styles.icon} />
    </div>
  );
};
