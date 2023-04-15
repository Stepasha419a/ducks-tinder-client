import type { FC, PropsWithChildren } from 'react';
import styles from './SettingGroup.module.scss';

interface SettingGroupProps {
  title?: string;
  descr?: string;
}

export const SettingGroup: FC<PropsWithChildren<SettingGroupProps>> = ({
  children,
  title,
  descr,
}) => {
  return (
    <div className={styles.group}>
      {title && <div className={styles.groupTitle}>{title}</div>}
      <div className={styles.items}>{children}</div>
      {descr && <div className={styles.groupDescr}>{descr}</div>}
    </div>
  );
};
