import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { RangeInput } from '@ducks-tinder-client/ui';

import type { PairFilterForm } from '@entities/user';

import * as styles from '../../PairsFilterPopup.module.scss';
import { useTranslation } from 'react-i18next';

interface DistanceSettingProps {
  control: Control<PairFilterForm>;
}

export const DistanceSetting: FC<DistanceSettingProps> = ({ control }) => {
  const { t } = useTranslation();

  const {
    field: { value: distance, onChange: setDistance },
  } = useController({ name: 'distance', control });

  return (
    <div className={styles.setting}>
      <div className={styles.name}>{t('pairs.filter.distance.title')}</div>
      <div className={styles.value}>
        {distance} {t('pairs.filter.distance.unit')}
      </div>
      <div className={`${styles.change} ${styles.margin}`}>
        <RangeInput
          value={{ value: distance }}
          setValue={(value) => setDistance(value.value!)}
          min={2}
          max={100}
        />
      </div>
    </div>
  );
};
