import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { PairSorts } from '@/entities/user/model/pair';
import { RangeInput } from '@shared/ui';
import styles from '../PairsSortPopup.module.scss';

interface AgeSettingProps {
  control: Control<PairSorts>;
}

export const AgeSetting: FC<AgeSettingProps> = ({ control }) => {
  const {
    field: { value: age, onChange: setAge },
  } = useController({ name: 'age', control });

  return (
    <div className={styles.setting}>
      <div className={styles.name}>Age range</div>
      <div className={styles.value}>
        from {age.from} to {age.to}
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
