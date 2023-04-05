import classNames from 'classnames';
import { forwardRef } from 'react';
import styles from './TextField.module.scss';
import type { TextFieldProps } from './TextField.types';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ variant = 'default', extraClassName, ...props }, ref) => {
    const cn = classNames(styles.input, styles[variant], extraClassName);

    return <input ref={ref} className={cn} {...props} />;
  },
);
