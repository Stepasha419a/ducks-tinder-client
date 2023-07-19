import type { FC, ReactElement } from 'react';
import {
  faLocationDot,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Places.module.scss';
import { useAppSelector } from '@shared/lib/hooks';

interface PlacesProps {
  refreshFeature: ReactElement;
}

export const Places: FC<PlacesProps> = ({ refreshFeature }) => {
  const place = useAppSelector((state) => state.user.currentUser.place);

  return (
    <div className={styles.places}>
      <div className={styles.subhead}>
        <div className={styles.subtitle}>Current positions</div>
        {refreshFeature}
      </div>
      {place && (
        <div className={styles.item}>
          <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
          <div className={styles.position}>
            <div className={styles.current}>My current position</div>
            <div className={styles.name}>
              {place.name} {place.address}
            </div>
          </div>
          <FontAwesomeIcon className={styles.mark} icon={faSquareCheck} />
        </div>
      )}
    </div>
  );
};
