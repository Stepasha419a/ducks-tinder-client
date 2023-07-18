import type { FC } from 'react';
import styles from './Text.module.scss';
import classNames from 'classnames';

interface TextProps {
  text: string;
  time: string;
  isEdited: boolean;
}

export const Text: FC<TextProps> = ({ text, time, isEdited }) => {
  const cnTimestamp = classNames(styles.timestamp, isEdited && styles.edited);

  return (
    <>
      <div className={styles.text}>{text}</div>
      <p className={cnTimestamp}>{time}</p>
    </>
  );
};
