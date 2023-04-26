import type { FC } from 'react';
import { Nav, Tinder } from '@widgets';
import { Instructions } from './components';
import styles from './Tinder.module.scss';

export const TinderPage: FC = () => {
  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.content}>
        <Tinder />
        <Instructions />
      </div>
    </div>
  );
};
