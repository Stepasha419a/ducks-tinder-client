import type { FC, PropsWithChildren } from 'react';
import styles from './SettingsGroup.module.scss';

interface SettingsGroupProps {
  title?: string;
  descr?: string;
}

export const SettingsGroup: FC<PropsWithChildren<SettingsGroupProps>> = ({
  children,
  title,
  descr,
}) => {
  return (
    <div className={styles.group}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.items}>{children}</div>
      {descr && <div className={styles.descr}>{descr}</div>}
    </div>
  );
};
