import classNames from 'classnames';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

type VariantType = 'gradient' | 'default' | 'setting' | 'auth';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  variant: VariantType;
  extraClassName?: string | string[];
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant,
  extraClassName,
  ...props
}) => {
  const cnButton = classNames(styles.button, styles[variant], extraClassName);
  return (
    <button className={cnButton} {...props}>
      {children}
    </button>
  );
};
