import { useState } from 'react';
import { SettingThumbnail } from '@entities/user';
import { updateUserThunk } from '@entities/user/model/user';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { RangeInput } from '@shared/ui';
import styles from '../SettingFeatureThumbnails.module.scss';

export const AgeSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const age = useAppSelector((state) => state.user.currentUser!.age);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const [ageSetting, setAgeSetting] = useState(age);

  const ageSubmitHandler = (): void => {
    dispatch(
      updateUserThunk({
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
