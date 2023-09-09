import type { FC, PropsWithChildren } from 'react';
import styles from './DotsWrapper.module.scss';

export const DotsWrapper: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.wrapper}>
    <ul className={styles.list}>{children}</ul>
  </div>
);
