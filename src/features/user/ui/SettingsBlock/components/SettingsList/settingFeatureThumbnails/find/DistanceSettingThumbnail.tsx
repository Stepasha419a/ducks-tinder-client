import { useState } from 'react';
import { SettingThumbnail } from '@entities/user';
import { updateUserThunk } from '@entities/user/model/user';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { CheckboxInput, RangeInput } from '@shared/ui';
import styles from '../SettingFeatureThumbnails.module.scss';

export const DistanceSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const distance = useAppSelector((state) => state.user.currentUser!.distance);
  const usersOnlyInDistance = useAppSelector(
    (state) => state.user.currentUser!.usersOnlyInDistance
  );
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const [distanceSetting, setDistanceSetting] = useState(distance);

  const distanceHandler = (): void => {
    dispatch(
      updateUserThunk({
        distance: distanceSetting!,
      })
    );
  };
  const setUsersOnlyInDistanceHandler = (): void => {
    dispatch(
      updateUserThunk({
        usersOnlyInDistance: !usersOnlyInDistance,
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
