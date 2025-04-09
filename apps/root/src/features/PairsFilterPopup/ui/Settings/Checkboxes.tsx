import type { FC } from 'react';

import { CheckboxInput } from '@ducks-tinder-client/ui';

import styles from '../../PairsFilterPopup.module.scss';

interface CheckboxesProps {
  hasInterests: boolean;
  identifyConfirmed: boolean;
  toggleHasInterests: () => void;
  toggleIdentifyConfirmed: () => void;
}

export const Checkboxes: FC<CheckboxesProps> = ({
  hasInterests,
  identifyConfirmed,
  toggleHasInterests,
  toggleIdentifyConfirmed,
}) => {
  return (
    <>
      <div className={`${styles.setting} ${styles.checkbox}`}>
        <CheckboxInput
          checked={identifyConfirmed}
          onChange={toggleIdentifyConfirmed}
          text="Identify confirmed"
        />
      </div>
      <div className={`${styles.setting} ${styles.checkbox}`}>
        <CheckboxInput
          checked={hasInterests}
          onChange={toggleHasInterests}
          text="Have interests"
        />
      </div>
    </>
  );
};
