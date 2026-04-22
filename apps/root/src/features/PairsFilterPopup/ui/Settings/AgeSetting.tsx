import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { RangeInput } from '@ducks-tinder-client/ui';

import type { PairFilterForm } from '@entities/user';

import * as styles from '../../PairsFilterPopup.module.scss';
import { useTranslation } from 'react-i18next';

interface AgeSettingProps {
  control: Control<PairFilterForm>;
}

export const AgeSetting: FC<AgeSettingProps> = ({ control }) => {
  const { t } = useTranslation();

  const {
    field: { value: age, onChange: setAge },
  } = useController({ name: 'age', control });

  return (
    <div className={styles.setting}>
      <div className={styles.name}>{t('pairs.filter.age.title')}</div>
      <div className={styles.value}>
        {t('pairs.filter.age.from')} {age.from} {t('pairs.filter.age.to')}{' '}
        {age.to}
      </div>
      <div className={`${styles.change} ${styles.margin}`}>
        <RangeInput
          value={{ min: age.from, max: age.to }}
          setValue={(value) => setAge({ from: value.min!, to: value.max! })}
          min={18}
          max={100}
          isMultiple
        />
      </div>
    </div>
  );
};
