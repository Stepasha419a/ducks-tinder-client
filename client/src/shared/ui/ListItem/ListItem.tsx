import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './ListItem.module.scss';

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  xmark?: boolean;
  extraClassName?: string;
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
  children,
  isActive,
  xmark,
  extraClassName,
  ...props
}) => {
  const cn = classNames(
    styles.item,
    isActive && styles.active,
    props.onClick && styles.pointer,
    extraClassName
  );
  return (
    <div className={cn} {...props}>
      {children}
      {xmark && <div className={styles.xmark} />}
    </div>
  );
};
