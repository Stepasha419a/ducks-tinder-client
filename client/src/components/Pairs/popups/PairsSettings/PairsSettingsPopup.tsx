import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { PreferAge } from '../../../../models/User';
import { Button, CheckboxInput, RangeInput } from '../../../ui/';
import { interestsForLoop } from '../../Pairs.constants';
import { Sorts } from '../../utils/PairsUtils';
import styles from './PairsSettingsPopup.module.scss';

interface PairsSettingsPopupProps {
  pairSorts: Sorts;
  clearSorts: () => void;
  addSort: (sortSetting: string | number | PreferAge, field: string) => void;
  toggleSort: (sortSetting: string, field: 'account' | 'interests') => void;
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
  setIsSortPopupOpen: (setting: boolean) => void;
}

const PairsSettingsPopup: React.FC<PairsSettingsPopupProps> = ({
  pairSorts,
  clearSorts,
  addSort,
  toggleSort,
  setIsInterestsSettingPopupOpen,
  setIsSortPopupOpen,
}) => {
  const [distanceSetting, setDistanceSetting] = useState(pairSorts.distance);
  const [ageSetting, setAgeSetting] = useState<PreferAge>(pairSorts.age);
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
                value={{value: distanceSetting}}
                setValue={(value) => setDistanceSetting(value.value!)}
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
              from {ageSetting.from} to {ageSetting.to}
            </div>
            <div className={`${styles.change} ${styles.margin}`}>
              <RangeInput
                value={{ min: ageSetting.from, max: ageSetting.to }}
                setValue={(value) =>
                  setAgeSetting({ from: value.min!, to: value.max! })
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
                const cnItem = classNames(
                  styles.item,
                  photoCount === item && styles.active
                );
                return (
                  <div
                    onClick={() => setPhotosCountHandler(item)}
                    key={item}
                    className={cnItem}
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
              {interestsForLoop.slice(0, 3).map((item) => {
                const cnItem = classNames(
                  styles.item,
                  pairSorts.interests.includes(item) && styles.active
                );
                return (
                  <div
                    onClick={() => toggleSort(item, 'interests')}
                    key={item}
                    className={cnItem}
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
            onChange={() => toggleSort('identify confirmed', 'account')}
            text="Identify confirmed"
            extraClassName={styles.checkboxNew}
          />
          <div className={styles.separator}></div>
          <CheckboxInput
            checked={pairSorts.account.includes('have interests')}
            onChange={() => toggleSort('have interests', 'account')}
            text="Have interests"
            extraClassName={styles.checkboxNew}
          />
          <div className={styles.separator}></div>
          <div className={styles.btns}>
            <Button
              onClick={clearSorts}
              extraClassName={`${styles.btn} ${styles.leftBorder}`}
            >
              Clear
            </Button>
            <Button
              onClick={() => setIsSortPopupOpen(false)}
              extraClassName={`${styles.btn} ${styles.rightBorder}`}
            >
              Confirm
            </Button>
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
