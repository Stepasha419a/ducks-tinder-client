import classNames from 'classnames';
import { FC } from 'react';
import styles from './TextField.module.scss';
import { TextFieldProps } from './TextField.types';

export const TextField: FC<TextFieldProps> = ({
  variant = 'default',
  extraClassName,
  ...props
}) => {
  const cn = classNames(styles.input, styles[variant], extraClassName);

  return <input className={cn} {...props} />;
};
