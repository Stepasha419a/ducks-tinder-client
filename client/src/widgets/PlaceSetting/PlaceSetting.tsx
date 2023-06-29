import { Map } from '@/entities/map/components';
import styles from './PlaceSetting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCheck,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@/shared/hooks';
import { nullInput } from '@/entities/setting/model';

export const PlaceSetting = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(nullInput());
  };

  return (
    <div className={styles.setting}>
      <div className={styles.head}>
        <div className={styles.title}>Place</div>
        <div onClick={handleSubmit} className={styles.submit}>
          Submit
        </div>
      </div>
      <Map />
      <div className={styles.positions}>
        <div className={styles.subtitle}>Current position</div>
        <div className={styles.item}>
          <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
          <div className={styles.position}>
            <div className={styles.current}>My current position</div>
            <div className={styles.name}>Moscow, Russia</div>
          </div>
          <FontAwesomeIcon className={styles.mark} icon={faSquareCheck} />
        </div>
      </div>
    </div>
  );
};
