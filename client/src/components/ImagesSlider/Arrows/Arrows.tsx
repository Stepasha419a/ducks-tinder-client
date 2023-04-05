import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { FC } from 'react';
import styles from './Arrows.module.scss';

interface ArrowsProps {
  current: number;
  length: number;
  prevSlide: () => void;
  nextSlide: () => void;
  arrowsExtraClassName?: string;
}

const Arrows: FC<ArrowsProps> = ({
  current,
  length,
  prevSlide,
  nextSlide,
  arrowsExtraClassName,
}) => {
  const cnArrows = classNames(styles.arrows, arrowsExtraClassName);
  return (
    <div className={cnArrows}>
      {current === 0 ? null : (
        <div onClick={prevSlide} className={styles.leftArrowWrapper}>
          <FontAwesomeIcon icon={faAngleLeft} className={styles.leftArrow} />
        </div>
      )}
      {current === length - 1 ? null : (
        <div onClick={nextSlide} className={styles.rigthArrowWrapper}>
          <FontAwesomeIcon icon={faAngleRight} className={styles.rightArrow} />
        </div>
      )}
    </div>
  );
};

export default Arrows;
