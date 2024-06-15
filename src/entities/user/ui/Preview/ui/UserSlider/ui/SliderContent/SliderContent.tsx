import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { FC } from 'react';
import type { UserPlaceInfo, UserSliderInfo } from '@entities/user';
import { ListItem } from '@shared/ui';
import styles from './SliderContent.module.scss';

interface SliderContentProps {
  name: string;
  age: number | null;
  info: UserSliderInfo[];
  currentSlide: number;
}

export const SliderContent: FC<SliderContentProps> = ({
  name,
  age,
  info,
  currentSlide,
}) => {
  const currentInfo = info[currentSlide];

  if (Array.isArray(currentInfo)) {
    return (
      <div className={classNames(styles.wrapper, styles.high)}>
        <div className={styles.person}>
          {name} <span className={styles.years}>{age}</span>
        </div>
        <div className={styles.items}>
          {currentInfo.map((item) => (
            <ListItem extraClassName={styles.listItem} key={item}>
              {item}
            </ListItem>
          ))}
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if ((currentInfo as UserPlaceInfo)?.place) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.person}>
          {name} <span className={styles.years}>{age}</span>
        </div>
        <div className={styles.place}>
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <span className={styles.name}>
            Lives in&nbsp;
            {(currentInfo as UserPlaceInfo).place.name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.person}>
        {name} <span className={styles.years}>{age}</span>
      </div>
    </div>
  );
};
