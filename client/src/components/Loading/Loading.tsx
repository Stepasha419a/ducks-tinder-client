import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../hooks';
import styles from './Loading.module.scss';

export const Loading = () => {
  const isLoading = useAppSelector((state) => state.authPage.isLoading);

  return (
    <div
      className={`${styles.loadingPage} ${isLoading ? '' : styles.invisible}`}
    >
      <FontAwesomeIcon icon={faFireFlameCurved} className={styles.icon} />
    </div>
  );
};
