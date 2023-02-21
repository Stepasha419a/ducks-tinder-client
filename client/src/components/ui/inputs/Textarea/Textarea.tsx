import classNames from 'classnames';
import { FC, TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  extraClassName?: string;
}

export const Textarea: FC<TextareaProps> = ({ extraClassName, ...props }) => {
  const cn = classNames(styles.textarea, extraClassName);

  return <textarea className={cn} {...props} />;
};
