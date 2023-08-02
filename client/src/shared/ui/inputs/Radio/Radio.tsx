import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { InputHTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import styles from './Radio.module.scss';

export interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  name?: string;
  text?: string;
  extraClassName?: string;
}

export const RadioInput = forwardRef<
  HTMLInputElement,
  PropsWithChildren<RadioInputProps>
>(({ text, extraClassName, children, ...props }, ref) => {
  const cn = classNames(styles.label, extraClassName);

  return (
    <label className={cn}>
      <input ref={ref} className={styles.input} type="radio" {...props} />
      {text}
      {props.checked && (
        <div className={styles.icon}>
          {children ?? <FontAwesomeIcon icon={faCheck} />}
        </div>
      )}
    </label>
  );
});
