import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import type { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant = 'default',
  border = false,
  rounded = false,
  extraClassName = '',
  ...props
}) => {
  const cnButton = classNames(
    styles.button,
    styles[variant],
    rounded && styles.rounded,
    border && styles.border,
    extraClassName
  );
  return (
    <button className={cnButton} {...props}>
      {children}
    </button>
  );
};
