import classNames from 'classnames';
import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  extraClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ extraClassName, ...props }, ref) => {
    const cn = classNames(styles.textarea, extraClassName);

    return <textarea ref={ref} className={cn} {...props} />;
  }
);
