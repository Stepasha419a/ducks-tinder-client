import type { ReactElement } from 'react';
import styles from './Preloader.module.scss';

const Preloader = (): ReactElement => (
  <div className={styles.ring}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Preloader;
