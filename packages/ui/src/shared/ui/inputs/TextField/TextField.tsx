import { forwardRef } from 'react';
import classNames from 'classnames';

import type { TextFieldProps } from './TextField.types';
import styles from './TextField.module.scss';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ variant = 'default', extraClassName, ...props }, ref) => {
    const cn = classNames(styles.input, styles[variant], extraClassName);

    return <input ref={ref} className={cn} {...props} />;
  }
);
