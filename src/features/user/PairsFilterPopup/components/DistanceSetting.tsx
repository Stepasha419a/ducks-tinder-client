import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { RangeInput } from '@shared/ui';
import type { PairFilterForm } from '@/entities/user/model/pair';
import styles from '../PairsFilterPopup.module.scss';

interface DistanceSettingProps {
  control: Control<PairFilterForm>;
}

export const DistanceSetting: FC<DistanceSettingProps> = ({ control }) => {
  const {
    field: { value: distance, onChange: setDistance },
  } = useController({ name: 'distance', control });

  return (
    <div className={styles.setting}>
      <div className={styles.name}>Max distantion</div>
      <div className={styles.value}>{distance} km</div>
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
