import type { ReactElement } from 'react';
import styles from './Preloader.module.scss';

export const Preloader = (): ReactElement => (
  <div className={styles.ring}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
