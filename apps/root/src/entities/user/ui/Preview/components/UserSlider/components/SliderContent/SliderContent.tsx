import type { FC } from 'react';
import { faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { ListItem } from '@ducks-tinder-client/ui';

import type { UserSliderInfo } from '@entities/user';

import styles from './SliderContent.module.scss';

interface SliderContentProps {
  name: string;
  age: number | null;
  info?: UserSliderInfo[];
  currentSlide: number;
  disabled?: boolean;
}

export const SliderContent: FC<SliderContentProps> = ({
  name,
  age,
  info,
  currentSlide,
  disabled,
}) => {
  const currentInfo = info?.[currentSlide];

  const cn = classNames(styles.wrapper, disabled && styles.disabled);

  if (typeof currentInfo === 'string') {
    return (
      <div className={cn}>
        <div className={styles.person}>
          {name} <span className={styles.years}>{age}</span>
        </div>
        <span className={styles.longText}>{currentInfo}</span>
      </div>
    );
  }

  if (Array.isArray(currentInfo)) {
    return (
      <div className={classNames(cn, styles.high)}>
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

  if (currentInfo && 'place' in currentInfo && currentInfo.place !== null) {
    return (
      <div className={cn}>
        <div className={styles.person}>
          {name} <span className={styles.years}>{age}</span>
        </div>
        <div className={styles.place}>
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <span className={styles.name}>
            Lives in&nbsp;
            {currentInfo.place.name}
          </span>
        </div>
        <div className={styles.distance}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
          <span className={styles.name}>
            {currentInfo.distance} km from you
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn}>
      <div className={styles.person}>
        {name} <span className={styles.years}>{age}</span>
      </div>
    </div>
  );
};
