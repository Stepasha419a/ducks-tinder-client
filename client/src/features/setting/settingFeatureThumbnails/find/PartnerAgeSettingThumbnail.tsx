import { SettingThumbnail } from '@entities/setting/components';
import { submitSettingsThunk } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useState } from 'react';
import { RangeInput } from '@shared/ui';
import styles from '../SettingFeatureThumbnails.module.scss';

export const PartnerAgeSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const preferAge = useAppSelector(
    (state) => state.user.currentUser.partnerSettings.age
  );

  const [preferAgeSetting, setPreferAgeSetting] = useState(preferAge);

  const partnerAgeHandler = (): void => {
    dispatch(
      submitSettingsThunk({
        inputName: 'age',
        changedData: preferAgeSetting,
        innerObjectName: 'partnerSettings',
      })
    );
  };

  return (
    <SettingThumbnail
      title="Partner age"
      value={`from ${preferAgeSetting.from} to ${preferAgeSetting.to}`}
    >
      <div className={styles.slider}>
        <RangeInput
          value={{ min: preferAgeSetting.from, max: preferAgeSetting.to }}
          setValue={(value) =>
            setPreferAgeSetting({ from: value.min!, to: value.max! })
          }
          completeValue={partnerAgeHandler}
          min={18}
          max={100}
          isMultiple
        />
      </div>
    </SettingThumbnail>
  );
};
