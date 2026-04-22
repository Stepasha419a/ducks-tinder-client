import type { FC } from 'react';

import { CheckboxInput } from '@ducks-tinder-client/ui';

import * as styles from '../../PairsFilterPopup.module.scss';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <>
      <div className={`${styles.setting} ${styles.checkbox}`}>
        <CheckboxInput
          checked={identifyConfirmed}
          onChange={toggleIdentifyConfirmed}
          text={t('pairs.filter.checkboxes.identifyConfirmed')}
        />
      </div>
      <div className={`${styles.setting} ${styles.checkbox}`}>
        <CheckboxInput
          checked={hasInterests}
          onChange={toggleHasInterests}
          text={t('pairs.filter.checkboxes.haveInterests')}
        />
      </div>
    </>
  );
};
