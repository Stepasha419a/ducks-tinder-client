import { SettingThumbnail } from '@entities/setting/components';
import { submitSettingsThunk } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useState } from 'react';
import { RangeInput } from '@shared/ui';
import styles from '../SettingFeatureThumbnails.module.scss';

export const PartnerAgeSettingThumbnail = () => {
  const dispatch = useAppDispatch();

  const preferAgeFrom = useAppSelector(
    (state) => state.user.currentUser.preferAgeFrom
  );
  const preferAgeTo = useAppSelector(
    (state) => state.user.currentUser.preferAgeTo
  );
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const [preferAgeSetting, setPreferAgeSetting] = useState({
    preferAgeFrom,
    preferAgeTo,
  });

  const partnerAgeHandler = (): void => {
    if (preferAgeSetting.preferAgeFrom !== preferAgeFrom) {
      dispatch(
        submitSettingsThunk({
          inputName: 'preferAgeFrom',
          changedData: preferAgeSetting.preferAgeFrom!,
        })
      );
    } else if (preferAgeSetting.preferAgeTo !== preferAgeTo) {
      dispatch(
        submitSettingsThunk({
          inputName: 'preferAgeTo',
          changedData: preferAgeSetting.preferAgeTo!,
        })
      );
    }
  };

  const areValuesDefined =
    preferAgeSetting.preferAgeFrom && preferAgeSetting.preferAgeTo;

  return (
    <SettingThumbnail
      title="Partner age"
      value={
        areValuesDefined
          ? `from ${preferAgeSetting.preferAgeFrom!} to ${preferAgeSetting.preferAgeTo!}`
          : 'unknown'
      }
      isError={
        errorFields.includes('preferAgeFrom') ||
        errorFields.includes('preferAgeTo')
      }
    >
      <div className={styles.slider}>
        <RangeInput
          value={{
            min: preferAgeSetting.preferAgeFrom || 28,
            max: preferAgeSetting.preferAgeTo || 90,
          }}
          setValue={(value) =>
            setPreferAgeSetting({
              preferAgeFrom: value.min!,
              preferAgeTo: value.max!,
            })
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
