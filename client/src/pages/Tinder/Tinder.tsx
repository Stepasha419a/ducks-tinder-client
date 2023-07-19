import type { FC, ReactElement } from 'react';
import { RateUser } from '@features/tinder';
import { Instructions } from './components';
import styles from './Tinder.module.scss';

const Tinder: FC = (): ReactElement => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.users}>
          <RateUser />
        </div>
      </div>
      <Instructions />
    </>
  );
};

export default Tinder;
