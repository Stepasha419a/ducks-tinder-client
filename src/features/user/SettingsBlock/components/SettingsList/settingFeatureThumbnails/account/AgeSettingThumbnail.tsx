import { SettingThumbnail } from '@entities/user/components';
import { submitSettingsThunk } from '@entities/user/model/setting';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import styles from '../SettingFeatureThumbnails.module.scss';
import { useState } from 'react';
import { RangeInput } from '@shared/ui';

export const AgeSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const age = useAppSelector((state) => state.user.currentUser.age);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const [ageSetting, setAgeSetting] = useState(age);

  const ageSubmitHandler = (): void => {
    dispatch(
      submitSettingsThunk({
        age: ageSetting!,
      })
    );
  };

  return (
    <SettingThumbnail
      title="Age"
      value={ageSetting ? `${ageSetting} years old` : 'unknown'}
      isError={errorFields.includes('age')}
    >
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
