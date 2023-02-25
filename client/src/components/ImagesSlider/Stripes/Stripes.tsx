import classNames from 'classnames';
import { FC } from 'react';
import styles from './Stripes.module.scss';

interface StripesProps {
  current: number;
  length: number;
}

const Stripes: FC<StripesProps> = ({ current, length }) => {
  const stripesArr = Array.from(Array(length).keys());
  return (
    <div className={styles.stripes}>
      {stripesArr.map((stripe) => {
        const cnStripe = classNames(
          styles.stripe,
          stripe === current ? styles.active : ''
        );

        return <div key={stripe} className={cnStripe}></div>;
      })}
    </div>
  );
};

export default Stripes;
