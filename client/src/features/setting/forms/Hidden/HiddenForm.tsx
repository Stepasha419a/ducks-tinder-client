import type { FC, ReactElement } from 'react';
import styles from './HiddenForm.module.scss';

export const HiddenForm: FC = (): ReactElement => {
  return <div className={styles.setting}></div>;
};
