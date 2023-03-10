import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useAppSelector } from '../../../../../hooks';
import {
  ChangedData,
  InnerObjectName,
  SettingInputName,
  Validation,
} from '../../../../../redux/settings/settings.interfaces';
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

  const [distanceSetting, setDistanceSetting] = useState(
    currentUser.partnerSettings.distance
  );
  const [preferAgeSetting, setPreferAgeSetting] = useState(
    currentUser.partnerSettings.age
  );

  const partnerAgeHandler = () => {
    updateInputHandler('age', preferAgeSetting, 'partnerSettings');
  };
  const distanceHandler = () => {
    updateInputHandler('distance', distanceSetting, 'partnerSettings');
  };
  const setUsersOnlyInDistanceHandler = () => {
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
            <div className={styles.setting}>{distanceSetting} км.</div>
          </div>
          <div className={styles.setting}>
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
              from {preferAgeSetting.from} to {preferAgeSetting.to}
            </div>
          </div>
          <div className={styles.setting}>
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
