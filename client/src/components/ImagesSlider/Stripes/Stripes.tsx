import classNames from 'classnames';
import { FC } from 'react';
import styles from './Stripes.module.scss';

interface StripesProps {
  current: number;
  length: number;
}

const Stripes: FC<StripesProps> = ({ current, length }) => {
  const stripesArr = [...new Array(length)];
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
