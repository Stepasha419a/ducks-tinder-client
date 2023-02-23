import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { IUser, PartnerSettings } from '../../../../../models/IUser';
import { ChangedData, IUserInnerKey, Validation } from '../../../../../redux/settings/settings.slice';
import { useAppSelector } from '../../../../../redux/store';
import { CheckboxInput, RangeInput } from '../../../../ui';
import { RangeInterface, RangeValue } from '../../../../ui/inputs/Range';
import styles from './Find.module.scss';

interface IFind {
  errorFields: string[];
  setSettingInput: (
    formName: string,
    inputName: string,
    validation?: Validation | null,
    innerObjectName?: string
  ) => void;
  submitSettings: (
    inputName: keyof IUser | keyof PartnerSettings,
    changedData: ChangedData,
    innerObjectName?: IUserInnerKey
  ) => void;
}

const Find: React.FC<IFind> = ({
  setSettingInput,
  errorFields,
  submitSettings,
}) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [ageSetting, setAgeSetting] = useState<{ min: number; max: number }>(
    currentUser.partnerSettings
      ? {
          min: currentUser.partnerSettings.age.from,
          max: currentUser.partnerSettings.age.to,
        }
      : { min: 18, max: 24 }
  );

  const [currentDistanceSetting, setCurrentDistanceSetting] = useState(
    currentUser.partnerSettings ? currentUser.partnerSettings.distance : 5
  );

  const partnerAgeHandler = () => {
    submitSettings(
      'age',
      { from: ageSetting.min, to: ageSetting.max },
      'partnerSettings'
    );
  };

  const distanceHandler = () => {
    submitSettings('distance', currentDistanceSetting, 'partnerSettings');
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>Find Settings</div>
      <div className={styles.items}>
        <div
          onClick={() => setSettingInput('Interests', 'interests')}
          className={`${styles.item} ${styles.item_pointer} ${
            errorFields.includes('interests') ? styles.item_error : ''
          }`}
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
          onClick={() => setSettingInput('Place', 'place', {min: 10, max: 30}, 'partnerSettings')}
          className={`${styles.item} ${styles.item_pointer} ${
            errorFields.includes('place') ? styles.item_error : ''
          }`}
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
        <div
          className={`${styles.item} ${
            errorFields.includes('distance') ? styles.item_error : ''
          }`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Distance</div>
            <div className={styles.setting}>
              {currentDistanceSetting || 'Empty distance'} км.
            </div>
          </div>
          <div className={styles.setting}>
            <div className={styles.slider}>
              <RangeInput
                value={currentDistanceSetting}
                setValue={(value: RangeValue) =>
                  setCurrentDistanceSetting(+value)
                }
                completeValue={() => distanceHandler()}
                min={2}
                max={100}
              />
            </div>
            <CheckboxInput
              checked={currentUser.partnerSettings.usersOnlyInDistance}
              onChange={() =>
                submitSettings(
                  'usersOnlyInDistance',
                  !currentUser.partnerSettings.usersOnlyInDistance,
                  'partnerSettings'
                )
              }
              variant="small"
              text="Show people only in this range"
            />
          </div>
        </div>
        <div
          onClick={() =>
            setSettingInput('Interested in', 'preferSex', null, 'partnerSettings')
          }
          className={`${styles.item} ${styles.item_pointer} ${
            errorFields.includes('preferSex') ? styles.item_error : ''
          }`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Interested in</div>
            <div className={styles.setting}>
              {currentUser.partnerSettings.preferSex || 'empty sex prefer'}
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
              from {ageSetting.min} to {ageSetting.max}
            </div>
          </div>
          <div className={styles.setting}>
            <div className={styles.slider}>
              <RangeInput
                value={ageSetting}
                setValue={(value: RangeValue) =>
                  setAgeSetting(value as RangeInterface)
                }
                completeValue={() => partnerAgeHandler()}
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

export default Find;
