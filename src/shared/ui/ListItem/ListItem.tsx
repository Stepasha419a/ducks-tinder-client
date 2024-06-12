import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import styles from './ListItem.module.scss';

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  pointer?: boolean;
  xmark?: boolean;
  extraClassName?: string;
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
  children,
  isActive,
  pointer,
  xmark,
  extraClassName,
  ...props
}) => {
  const cn = classNames(
    styles.item,
    isActive && styles.active,
    xmark && styles.xmark,
    pointer && styles.pointer,
    extraClassName
  );
  return (
    <div className={cn} {...props}>
      {children}
      {xmark && <div className={styles.xmark} />}
    </div>
  );
};
