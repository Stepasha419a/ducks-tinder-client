import type { FC } from 'react';
import classNames from 'classnames';

import * as styles from './Text.module.scss';

interface TextProps {
  text: string;
  time: string;
}

export const Text: FC<TextProps> = ({ text, time }) => {
  const cnTimestamp = classNames(styles.timestamp);

  return (
    <>
      <div className={styles.text}>{text}</div>
      <p className={cnTimestamp}>{time}</p>
    </>
  );
};
