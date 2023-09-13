import type { FC } from 'react';
import classNames from 'classnames';
import styles from './Dot.module.scss';

interface DotProps {
  isActive: boolean;
}

export const Dot: FC<DotProps> = ({ isActive }) => (
  <div className={styles.wrapper}>
    <div className={classNames(styles.dot, isActive && styles.active)} />
  </div>
);
