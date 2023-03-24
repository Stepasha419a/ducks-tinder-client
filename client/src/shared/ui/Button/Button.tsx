import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant = 'default',
  extraClassName = '',
  ...props
}) => {
  const cnButton = classNames(styles.button, styles[variant], extraClassName);
  return (
    <button className={cnButton} {...props}>
      {children}
    </button>
  );
};
