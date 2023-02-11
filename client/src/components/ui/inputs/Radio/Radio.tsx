import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC, InputHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Radio.module.scss';

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: () => void;
  checked: boolean;
  name: string;
  text?: string;
  extraClassName?: string;
}

export const RadioInput: FC<PropsWithChildren<RadioInputProps>> = ({
  text,
  extraClassName,
  children,
  ...props
}) => {
  const cn = classNames(extraClassName, styles.label);

  return (
    <label className={cn}>
      <input className={styles.input} type="radio" {...props} />
      {text}
      {props.checked && (
        <div className={styles.icon}>
          {children ? children : <FontAwesomeIcon icon={faCheck} />}
        </div>
      )}
    </label>
  );
};
