import type { FC, PropsWithChildren } from 'react';
import styles from './Content.module.scss';

export const Content: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
