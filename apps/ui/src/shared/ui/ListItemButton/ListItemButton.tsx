import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './ListItemButton.module.scss';

interface ListItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  xmark?: boolean;
  extraClassName?: string;
}

export const ListItemButton: FC<PropsWithChildren<ListItemButtonProps>> = ({
  children,
  isActive,
  xmark,
  extraClassName,
  ...props
}) => {
  const cn = classNames(
    styles.item,
    isActive && styles.active,
    xmark && styles.xmark,
    extraClassName
  );
  return (
    <button className={cn} {...props}>
      {children}
      {xmark && <div className={styles.xmark} />}
    </button>
  );
};
