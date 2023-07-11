import { SettingThumbnail } from '@entities/setting/components';
import { submitSettingsThunk } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';
import styles from '../SettingFeatureThumbnails.module.scss';
import { useState } from 'react';
import { CheckboxInput, RangeInput } from '@shared/ui';

export const DistanceSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const distance = useAppSelector((state) => state.user.currentUser.distance);
  const usersOnlyInDistance = useAppSelector(
    (state) => state.user.currentUser.usersOnlyInDistance
  );
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const [distanceSetting, setDistanceSetting] = useState(distance);

  const distanceHandler = (): void => {
    dispatch(
      submitSettingsThunk({
        setting: 'distance',
        changedData: distanceSetting!,
      })
    );
  };
  const setUsersOnlyInDistanceHandler = (): void => {
    dispatch(
      submitSettingsThunk({
        setting: 'usersOnlyInDistance',
        changedData: !usersOnlyInDistance,
      })
    );
  };

  return (
    <SettingThumbnail
      title="Distance"
      value={distanceSetting ? `${distanceSetting} km.` : 'unknown'}
      isError={errorFields.includes('distance')}
    >
      <div className={styles.slider}>
        <RangeInput
          value={{ value: distanceSetting }}
          setValue={(value) => setDistanceSetting(value.value!)}
          completeValue={distanceHandler}
          min={2}
          max={100}
        />
      </div>
      <CheckboxInput
        checked={usersOnlyInDistance}
        onChange={setUsersOnlyInDistanceHandler}
        variant="small"
        text="Show people only in this range"
      />
    </SettingThumbnail>
  );
};
