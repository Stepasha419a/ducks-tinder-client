import { useState } from 'react';

import { RangeInput } from '@ducks-tinder-client/ui';

import { SettingThumbnail , updateUserThunk } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/lib';

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
