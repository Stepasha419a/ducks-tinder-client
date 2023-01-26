import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import styles from './TextField.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  variant: 'rounded' | 'squared';
  extraClassName?: string;
}

export const TextField: FC<InputProps> = ({
  variant,
  extraClassName,
  ...props
}) => {
  const cn = classNames(styles.input, styles[variant], extraClassName);

  return <input className={cn} {...props} />;
};
