import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useAppSelector } from '../../../../../redux/reduxStore';
import RangeSlider, {
  IRange,
} from '../../../../Slider/RangeSlider/RangeSlider';
import styles from './Find.module.scss';

interface IFind {
  errorFields: string[];
  setSettingInput: (
    formName: string,
    inputName: string,
    innerObjectName?: string
  ) => void;
  submitSettings: (
    inputName: string,
    changedData:
      | string
      | number
      | boolean
      | string[]
      | { from: number; to: number },
    innerObjectName?: string
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
          onClick={() => setSettingInput('Place', 'place', 'partnerSettings')}
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
              <RangeSlider
                value={currentDistanceSetting}
                setValue={(value: number | IRange) =>
                  setCurrentDistanceSetting(value as number)
                }
                completeValue={() => distanceHandler()}
                min={2}
                max={100}
              />
            </div>
            <div className={styles.checkbox}>
              Show people only in this range
              <label className={styles.label}>
                <input
                  checked={currentUser.partnerSettings.usersOnlyInDistance}
                  onChange={(e) =>
                    submitSettings(
                      'usersOnlyInDistance',
                      e.target.checked,
                      'partnerSettings'
                    )
                  }
                  type="checkbox"
                  className={styles.input}
                />
                <div className={styles.content}></div>
              </label>
            </div>
          </div>
        </div>
        <div
          onClick={() =>
            setSettingInput('Interested in', 'preferSex', 'partnerSettings')
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
              <RangeSlider
                value={ageSetting}
                setValue={(value: number | IRange) =>
                  setAgeSetting(value as IRange)
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
