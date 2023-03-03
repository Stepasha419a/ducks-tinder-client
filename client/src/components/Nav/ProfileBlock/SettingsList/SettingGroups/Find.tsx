import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { PreferAge } from '../../../../../models/User';
import {
  ChangedData,
  InnerObjectName,
  SettingInputName,
  Validation,
} from '../../../../../redux/settings/settings.interfaces';
import { useAppSelector } from '../../../../../redux/store';
import { CheckboxInput, RangeInput } from '../../../../ui';
import styles from '../SettingsList.module.scss';

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
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const errorFields = useAppSelector((state) => state.settings.errorFields);

  const [ageSetting, setAgeSetting] = useState<PreferAge>({
    from: currentUser.partnerSettings.age.from,
    to: currentUser.partnerSettings.age.to,
  });

  const [currentDistanceSetting, setCurrentDistanceSetting] = useState<number>(
    currentUser.partnerSettings.distance
  );

  const partnerAgeHandler = () => {
    updateInputHandler('age', { ...ageSetting }, 'partnerSettings');
  };
  const distanceHandler = () => {
    updateInputHandler('distance', currentDistanceSetting, 'partnerSettings');
  };
  const onlyInDistanceHandler = () => {
    updateInputHandler(
      'usersOnlyInDistance',
      !currentUser.partnerSettings.usersOnlyInDistance,
      'partnerSettings'
    );
  };

  const setInterestsHandler = () => {
    setInputHandler('interests');
  };
  const setPlaceHandler = () => {
    setInputHandler('place', { min: 12, max: 30 }, 'partnerSettings');
  };
  const setPreferSexHandler = () => {
    setInputHandler('preferSex', null, 'partnerSettings', 'Interested in');
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>Find Settings</div>
      <div className={styles.items}>
        <div
          onClick={setInterestsHandler}
          className={classNames(
            styles.item,
            styles.pointer,
            errorFields.includes('interests') && styles.error
          )}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Interests</div>
            <div className={styles.setting}>
              {!currentUser.interests.length
                ? 'Empty interests'
                : `${currentUser.interests[0]} and so on...`}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div
          onClick={setPlaceHandler}
          className={classNames(
            styles.item,
            styles.pointer,
            errorFields.includes('place') && styles.error
          )}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Place</div>
            <div className={styles.setting}>
              {currentUser.partnerSettings.place || 'Empty place'}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.descr}>
            <div className={styles.title}>Distance</div>
            <div className={styles.setting}>{currentDistanceSetting} км.</div>
          </div>
          <div className={styles.setting}>
            <div className={styles.slider}>
              <RangeInput
                value={{ value: currentDistanceSetting }}
                setValue={(value) => setCurrentDistanceSetting(value.value!)}
                completeValue={distanceHandler}
                min={2}
                max={100}
              />
            </div>
            <CheckboxInput
              checked={currentUser.partnerSettings.usersOnlyInDistance}
              onChange={onlyInDistanceHandler}
              variant="small"
              text="Show people only in this range"
            />
          </div>
        </div>
        <div
          onClick={setPreferSexHandler}
          className={`${styles.item} ${styles.pointer}`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Interested in</div>
            <div className={styles.setting}>
              {currentUser.partnerSettings.preferSex}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.descr}>
            <div className={styles.title}>Partner age</div>
            <div className={styles.setting}>
              from {ageSetting.from} to {ageSetting.to}
            </div>
          </div>
          <div className={styles.setting}>
            <div className={styles.slider}>
              <RangeInput
                value={{ min: ageSetting.from, max: ageSetting.to }}
                setValue={(value) =>
                  setAgeSetting({ from: value.min!, to: value.max! })
                }
                completeValue={partnerAgeHandler}
                min={18}
                max={100}
                isMultiple
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groupDescr}>
        When the local profiles are over, you will be able to switch to the
        Global Mode for dating people from all over the world.
      </div>
    </div>
  );
};
