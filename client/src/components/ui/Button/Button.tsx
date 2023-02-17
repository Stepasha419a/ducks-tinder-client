import classNames from 'classnames';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

type VariantType =
  | 'gradient'
  | 'default'
  | 'setting'
  | 'auth'
  | 'closePopup'
  | 'mark'
  | 'tinder';

type SizeType = 'small' | 'large';

type ColorType = 'gold' | 'red' | 'blue' | 'green' | 'purple';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  extraClassName?: string | string[];
  size?: SizeType;
  color?: ColorType;
}

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
