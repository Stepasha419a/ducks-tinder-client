import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './ListItem.module.scss';

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  extraClassName?: string;
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
  children,
  isActive,
  extraClassName,
  ...props
}) => {
  const cn = classNames(styles.item, isActive && styles.active, extraClassName);
  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
