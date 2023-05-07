import type { FC } from 'react';
import { CheckboxInput } from '@shared/ui';
import styles from '../PairsSortPopup.module.scss';

interface CheckboxesProps {
  account: string[];
  toggleAccount: (item: string) => void;
}

export const Checkboxes: FC<CheckboxesProps> = ({ account, toggleAccount }) => {
  return (
    <>
      <div className={`${styles.setting} ${styles.checkbox}`}>
        <CheckboxInput
          checked={account.includes('identify confirmed')}
          onChange={() => toggleAccount('identify confirmed')}
          text="Identify confirmed"
        />
      </div>
      <div className={`${styles.setting} ${styles.checkbox}`}>
        <CheckboxInput
          checked={account.includes('have interests')}
          onChange={() => toggleAccount('have interests')}
          text="Have interests"
        />
      </div>
    </>
  );
};
