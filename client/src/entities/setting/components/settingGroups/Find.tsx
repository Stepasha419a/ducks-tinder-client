import type { FC } from 'react';
import { useState } from 'react';
import { useAppSelector } from '@hooks';
import type {
  ChangedData,
  InnerObjectName,
  SettingInputName,
} from '@shared/api/interfaces';
import type { Validation } from '@shared/interfaces';
import {
  CheckboxInput,
  RangeInput,
  SettingThumbnail,
  SettingsGroup,
} from '@shared/ui';
import styles from './SettingsGroup.module.scss';

interface FindProps {
  setInputHandler: (
    inputName: SettingInputName,
    validation?: Validation | null,
    innerObjectName?: InnerObjectName,
    formName?: string
  ) => void;
  updateInputHandler: (
    inputName: SettingInputName,
    changedData: ChangedData,
    innerObjectName?: InnerObjectName
  ) => void;
}

export const Find: FC<FindProps> = ({
  setInputHandler,
  updateInputHandler,
}) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const [distanceSetting, setDistanceSetting] = useState(
    currentUser.partnerSettings.distance
  );
  const [preferAgeSetting, setPreferAgeSetting] = useState(
    currentUser.partnerSettings.age
  );

  const partnerAgeHandler = (): void => {
    updateInputHandler('age', preferAgeSetting, 'partnerSettings');
  };
  const distanceHandler = (): void => {
    updateInputHandler('distance', distanceSetting, 'partnerSettings');
  };
  const setUsersOnlyInDistanceHandler = (): void => {
    updateInputHandler(
      'usersOnlyInDistance',
      !currentUser.partnerSettings.usersOnlyInDistance,
      'partnerSettings'
    );
  };

  const setInterestsHandler = (): void => {
    setInputHandler('interests');
  };
  const setPlaceHandler = (): void => {
    setInputHandler('place', { min: 12, max: 30 }, 'partnerSettings');
  };
  const setPreferSexHandler = (): void => {
    setInputHandler('preferSex', null, 'partnerSettings', 'Interested in');
  };

  return (
    <SettingsGroup
      title="Find Settings"
      descr="When the local profiles are over, you will be able to switch to the
    Global Mode for dating people from all over the world."
    >
      <SettingThumbnail
        clickHandler={setInterestsHandler}
        title="Interests"
        value={
          !currentUser.interests.length
            ? 'Empty interests'
            : `${currentUser.interests[0]} and so on...`
        }
        isPointer
        isError={errorFields.includes('interests')}
      />
      <SettingThumbnail
        clickHandler={setPlaceHandler}
        title="Place"
        value={currentUser.partnerSettings.place || 'Empty place'}
        isPointer
        isError={errorFields.includes('place')}
      />
      <SettingThumbnail title="Distance" value={`${distanceSetting} км.`}>
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
          checked={currentUser.partnerSettings.usersOnlyInDistance}
          onChange={setUsersOnlyInDistanceHandler}
          variant="small"
          text="Show people only in this range"
        />
      </SettingThumbnail>
      <SettingThumbnail
        clickHandler={setPreferSexHandler}
        title="Interested in"
        value={currentUser.partnerSettings.preferSex}
        isPointer
      />
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
    </SettingsGroup>
  );
};
