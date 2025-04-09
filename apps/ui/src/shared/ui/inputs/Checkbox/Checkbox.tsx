import type { FC } from 'react';
import classNames from 'classnames';

import type { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

export const CheckboxInput: FC<CheckboxProps> = ({
  variant = 'full',
  text,
  extraClassName,
  ...props
}) => {
  const cn = classNames(styles.label, styles[variant], extraClassName);

  return (
    <label className={cn}>
      <input className={styles.input} type="checkbox" {...props} />
      {text}
      <div className={styles.icon} />
    </label>
  );
};
