import type { FC } from 'react';
import classNames from 'classnames';

import * as styles from './Text.module.scss';

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
