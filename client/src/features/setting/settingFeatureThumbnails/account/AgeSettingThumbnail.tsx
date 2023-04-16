import { SettingThumbnail } from '@entities/setting/components';
import { submitSettingsThunk } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';
import styles from '../SettingFeatureThumbnails.module.scss';
import { useState } from 'react';
import { RangeInput } from '@shared/ui';

export const AgeSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const age = useAppSelector((state) => state.user.currentUser.age);

  const [ageSetting, setAgeSetting] = useState(age);

  const ageSubmitHandler = (): void => {
    dispatch(
      submitSettingsThunk({
        inputName: 'age',
        changedData: ageSetting,
      })
    );
  };

  return (
    <SettingThumbnail title="Age" value={`${ageSetting} years old`}>
      <div className={styles.slider}>
        <RangeInput
          value={{ value: ageSetting }}
          setValue={(value) => setAgeSetting(value.value!)}
          completeValue={ageSubmitHandler}
          min={18}
          max={100}
        />
      </div>
    </SettingThumbnail>
  );
};
