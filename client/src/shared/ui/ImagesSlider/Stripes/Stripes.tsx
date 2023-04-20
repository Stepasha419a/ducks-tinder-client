import type { FC } from 'react';
import classNames from 'classnames';
import styles from './Stripes.module.scss';

interface StripesProps {
  current: number;
  length: number;
}

const Stripes: FC<StripesProps> = ({ current, length }) => {
  const stripesArr: undefined[] = [...new Array(length) as undefined[]];
  return (
    <div className={styles.stripes}>
      {stripesArr.map((_, i) => {
        const cnStripe = classNames(
          styles.stripe,
          i === current ? styles.active : ''
        );

        return <div key={i} className={cnStripe}></div>;
      })}
    </div>
  );
};

export default Stripes;