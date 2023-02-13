import { useEffect, useState } from 'react';
import { CheckboxInput, RangeInput } from '../../../ui/';
import { RangeInterface, RangeValue } from '../../../ui/inputs/Range';
import { ISorts } from '../../utils/PairsUtils';
import styles from './PairsSettingsPopup.module.scss';

interface PairsSettingsPopupProps {
  pairSorts: ISorts;
  clearSorts: () => void;
  addSort: (
    sortSetting: string | number | { min: number; max: number },
    field: string
  ) => void;
  deleteSort: (
    sortSetting: string | number | { min: number; max: number },
    field: string
  ) => void;
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
  setIsSortPopupOpen: (setting: boolean) => void;
}

const PairsSettingsPopup: React.FC<PairsSettingsPopupProps> = ({
  pairSorts,
  clearSorts,
  addSort,
  deleteSort,
  setIsInterestsSettingPopupOpen,
  setIsSortPopupOpen,
}) => {
  const [distanceSetting, setDistanceSetting] = useState(pairSorts.distance);
  const [ageSetting, setAgeSetting] = useState<{ min: number; max: number }>(
    pairSorts.age
  );
  const [photoCount, setPhotoCount] = useState(pairSorts.photos);

  const arrForLoop = [];
  for (let i = 1; i <= 9; i++) {
    arrForLoop.push(i);
  }

  const setPhotosCountHandler = (value: number) => {
    addSort(value, 'photos');
    setPhotoCount(value);
  };

  useEffect(() => {
    setDistanceSetting(pairSorts.distance);
    setAgeSetting(pairSorts.age);
    setPhotoCount(pairSorts.photos);
  }, [pairSorts]);

  const distanceHandler = () => {
    addSort(distanceSetting, 'distance');
  };

  const ageHandler = () => {
    addSort(ageSetting, 'age');
  };

  return (
    <div className={styles.popup}>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>Likes filter</div>
          <div
            onClick={() => setIsSortPopupOpen(false)}
            className={styles.close}
          ></div>
          <div className={styles.setting}>
            <div className={styles.name}>Max distantion</div>
            <div className={styles.value}>{distanceSetting} km</div>
            <div className={`${styles.change} ${styles.margin}`}>
              <RangeInput
                value={distanceSetting}
                setValue={(value: RangeValue) => setDistanceSetting(+value)}
                completeValue={() => distanceHandler()}
                min={2}
                max={100}
              />
            </div>
          </div>
          <div className={styles.separator} />
          <div className={styles.setting}>
            <div className={styles.name}>Age range</div>
            <div className={styles.value}>
              from {ageSetting.min} to {ageSetting.max}
            </div>
            <div className={`${styles.change} ${styles.margin}`}>
              <RangeInput
                value={ageSetting}
                setValue={(value: RangeValue) =>
                  setAgeSetting(value as RangeInterface)
                }
                completeValue={() => ageHandler()}
                min={18}
                max={100}
                isMultiple
              />
            </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.setting}>
            <div className={styles.name}>Min photo's count</div>
            <div className={`${styles.change} ${styles.flex}`}>
              {arrForLoop.map((item) => {
                return (
                  <div
                    onClick={() => setPhotosCountHandler(item)}
                    key={item}
                    className={`${styles.item} 
                      ${photoCount === item ? styles.active : ''}`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.setting}>
            <div className={styles.name}>Interests</div>
            <div className={`${styles.change} ${styles.flex}`}>
              {['music', 'travelling', 'movies'].map((item) => {
                return (
                  <div
                    onClick={() => {
                      pairSorts.interests.includes(item)
                        ? deleteSort(item, 'interests')
                        : addSort(item, 'interests');
                    }}
                    key={item}
                    className={`${styles.item} ${
                      pairSorts.interests.includes(item) ? styles.active : ''
                    }`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => setIsInterestsSettingPopupOpen(true)}
              className={styles.showAll}
            >
              Show all
            </div>
          </div>
          <div className={styles.separator} />
          <CheckboxInput
            checked={pairSorts.account.includes('identify confirmed')}
            onChange={() => {
              pairSorts.account.includes('identify confirmed')
                ? deleteSort('identify confirmed', 'account')
                : addSort('identify confirmed', 'account');
            }}
            text="Identify confirmed"
            extraClassName={styles.checkboxNew}
          />
          <div className={styles.separator}></div>
          <CheckboxInput
            checked={pairSorts.account.includes('have interests')}
            onChange={() => {
              pairSorts.account.includes('have interests')
                ? deleteSort('have interests', 'account')
                : addSort('have interests', 'account');
            }}
            text="Have interests"
            extraClassName={styles.checkboxNew}
          />
          <div className={styles.separator}></div>
          <div className={styles.btns}>
            <button
              onClick={() => clearSorts()}
              className={`${styles.btn} ${styles.leftBorder}`}
            >
              Clear
            </button>
            <button
              onClick={() => setIsSortPopupOpen(false)}
              className={`${styles.btn} ${styles.rightBorder}`}
            >
              Confirm
            </button>
          </div>
        </div>
        <div
          onClick={() => setIsSortPopupOpen(false)}
          className={styles.closeArea}
        ></div>
      </div>
    </div>
  );
};

export default PairsSettingsPopup;
